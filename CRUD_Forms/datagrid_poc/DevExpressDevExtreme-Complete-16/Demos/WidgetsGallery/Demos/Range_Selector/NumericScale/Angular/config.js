System.config({
    transpiler: 'ts',
    typescriptOptions: {
        module: "commonjs",
        emitDecoratorMetadata: true,
        experimentalDecorators: true
    },
    meta: {
        'typescript': {
            "exports": "ts"
        }
    },
    paths: {
        'npm:': 'https://unpkg.com/'
    },
    map: {
        'ts': 'npm:plugin-typescript@4.0.10/lib/plugin.js',
        'typescript': 'npm:typescript@2.0.6/lib/typescript.js',

        '@angular/core': 'npm:@angular/core@2.0.0/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common@2.0.0/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler@2.0.0/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser@2.0.0/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@2.0.0/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http@2.0.0/bundles/http.umd.js',
        '@angular/router': 'npm:@angular/router@3.0.0/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms@2.0.0/bundles/forms.umd.js',

        'rxjs': 'npm:rxjs',
        
        'jszip': 'npm:jszip/dist/jszip.min.js',
        'devextreme': 'npm:devextreme@16.2.3',
        'jquery': 'npm:jquery/dist/jquery.min.js',
        'devextreme-angular': 'npm:devextreme-angular@16.2.3-rc.1'
    },
    packages: {
        'app': {
            main: './app.component.ts',
            defaultExtension: 'ts'
        },
        'devextreme': {
            defaultExtension: 'js'
        },
        'devextreme-angular': {
            main: 'index.js',
            defaultExtension: 'js'
        }
    }
});