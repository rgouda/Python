import json
from nameko.rpc import rpc
from passlib.apps import custom_app_context
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import MetaData
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)

import lib_dbutils as db
import lib_misc_utils as misc
import lib_ldenv as env
from db_schema_magento import Users

Base = declarative_base()
env.AppCfg.register('lhs_env')
log = misc.get_formatted_logger(name=__name__)
cfg = env.get_config_object()


class Login(object):
    name = 'login'

    def __init__(self):
        self.session = db.database_factory().session
        self.meta = MetaData(bind=self.session.get_bind())
        # TODO: Change this to SQL Alchemy caching later to handle cache dirty.
        # Build a dictionary with keys: usernames and user id
        self.users = {u.username: u for u in self.session.query(Users).filter(Users.is_active == 1).all()}
        self.users.update({u.id: u for u in self.users.values()})

    def get_user(self, username):
        try:
            return self.users[username]
        except KeyError:
            raise Exception('Unknown user name {}, requires registration first.'.format(username))

    def hash_password(self, password):
        return custom_app_context.encrypt(password)

    def verify_password(self, current_user, password):
        return custom_app_context.verify(password, current_user.password_hash)

    @staticmethod
    def generate_auth_token(user, expiration=360*12):
        """Generates unique token key for the requested user. This is returned when the user authenticates with user id
        / password."""
        s = Serializer(cfg.SECRET_KEY, expiration)
        return s.dumps({'id': user.id}).decode('utf-8')

    def verify_auth_token(self, token):
        """Verifies the token passed has a valid user id."""
        s = Serializer(cfg.SECRET_KEY)
        try:
            data = s.loads(token)
        except SignatureExpired:
            log.debug('Token expired')
            return None
        except BadSignature:
            log.debug('Not a valid token')
            return None

        user = self.get_user(data['id'])
        user.auth_token = token
        return user

    @rpc
    def verify_login(self, username_or_token, password):
        """Verifies if it is a valid token, if not is it a valid user and password. Password is optional if the
        user name is a session token."""
        log.debug('Verifying user login/password')
        # Verify authentication token, if success return True
        log.debug('username=' + str(username_or_token) + '; password=' + str(password))
        user = self.verify_auth_token(username_or_token)
        if not user:
            # Verify user id / password, if success return True
            user = self.get_user(username_or_token)

            if user and self.verify_password(user, password):
                user.auth_token = Login.generate_auth_token(user)
            else:
                user = None

        results = json.dumps({'id': user.id, 'username':user.username, 'token': user.auth_token})
        return results


if __name__ == "__main__":
    l = Login()
    print(l.verify_login('test', 'test'))
