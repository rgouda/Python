import { Injectable } from '@angular/core';

export class Order {
    ID: number;
    OrderNumber: number;
    OrderDate: string;
    SaleAmount: number;
    ShippingAmount: number;
    TotalAmount: number;
    Terms: string;
    CustomerStoreState: string;
    CustomerStoreCity: string;
    Employee: string;
}

let orders: Order[] = [{
    "ID": 1,
    "OrderNumber": 35703,
    "OrderDate": "2014/02/13",
    "SaleAmount": 11800,
    "ShippingAmount": 375,
    "TotalAmount": 12175,
    "Terms": "15 Days",
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Los Angeles",
    "Employee": "Harv Mudd"
}, {
    "ID": 4,
    "OrderNumber": 35711,
    "OrderDate": "2014/03/21",
    "SaleAmount": 16050,
    "ShippingAmount": 500,
    "TotalAmount": 16550,
    "Terms": "15 Days",
    "CustomerStoreState": "California",
    "CustomerStoreCity": "San Jose",
    "Employee": "Jim Packard"
}, {
    "ID": 5,
    "OrderNumber": 35714,
    "OrderDate": "2014/04/19",
    "SaleAmount": 14750,
    "ShippingAmount": 500,
    "TotalAmount": 15250,
    "Terms": "15 Days",
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 7,
    "OrderNumber": 35983,
    "OrderDate": "2014/01/12",
    "SaleAmount": 3725,
    "ShippingAmount": 125,
    "TotalAmount": 3850,
    "Terms": "15 Days",
    "CustomerStoreState": "Colorado",
    "CustomerStoreCity": "Denver",
    "Employee": "Todd Hoffman"
}, {
    "ID": 9,
    "OrderNumber": 36987,
    "OrderDate": "2014/04/08",
    "SaleAmount": 14200,
    "ShippingAmount": 600,
    "TotalAmount": 14800,
    "Terms": "15 Days",
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 11,
    "OrderNumber": 38466,
    "OrderDate": "2014/02/28",
    "SaleAmount": 7800,
    "ShippingAmount": 400,
    "TotalAmount": 8200,
    "Terms": "15 Days",
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Los Angeles",
    "Employee": "Harv Mudd"
}, {
    "ID": 15,
    "OrderNumber": 39874,
    "OrderDate": "2014/05/28",
    "SaleAmount": 18600,
    "ShippingAmount": 500,
    "TotalAmount": 19100,
    "Terms": "30 Days",
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 18,
    "OrderNumber": 42847,
    "OrderDate": "2014/02/06",
    "SaleAmount": 20400,
    "ShippingAmount": 400,
    "TotalAmount": 20800,
    "Terms": "30 Days",
    "CustomerStoreState": "Wyoming",
    "CustomerStoreCity": "Casper",
    "Employee": "Todd Hoffman"
}, {
    "ID": 19,
    "OrderNumber": 43982,
    "OrderDate": "2014/02/16",
    "SaleAmount": 6050,
    "ShippingAmount": 200,
    "TotalAmount": 6250,
    "Terms": "30 Days",
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 29,
    "OrderNumber": 56272,
    "OrderDate": "2014/01/25",
    "SaleAmount": 15850,
    "ShippingAmount": 500,
    "TotalAmount": 16350,
    "Terms": "30 Days",
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 30,
    "OrderNumber": 57429,
    "OrderDate": "2013/12/31",
    "SaleAmount": 11050,
    "ShippingAmount": 350,
    "TotalAmount": 11400,
    "Terms": "30 Days",
    "CustomerStoreState": "Arizona",
    "CustomerStoreCity": "Phoenix",
    "Employee": "Clark Morgan"
}, {
    "ID": 32,
    "OrderNumber": 58292,
    "OrderDate": "2014/04/29",
    "SaleAmount": 13500,
    "ShippingAmount": 300,
    "TotalAmount": 13800,
    "Terms": "15 Days",
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Los Angeles",
    "Employee": "Harv Mudd"
}, {
    "ID": 36,
    "OrderNumber": 62427,
    "OrderDate": "2014/05/10",
    "SaleAmount": 23500,
    "ShippingAmount": 500,
    "TotalAmount": 24000,
    "Terms": "15 Days",
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 39,
    "OrderNumber": 65977,
    "OrderDate": "2014/02/24",
    "SaleAmount": 2550,
    "ShippingAmount": 75,
    "TotalAmount": 2625,
    "Terms": "15 Days",
    "CustomerStoreState": "Wyoming",
    "CustomerStoreCity": "Casper",
    "Employee": "Todd Hoffman"
}, {
    "ID": 40,
    "OrderNumber": 66947,
    "OrderDate": "2014/01/05",
    "SaleAmount": 3500,
    "ShippingAmount": 100,
    "TotalAmount": 3600,
    "Terms": "15 Days",
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 42,
    "OrderNumber": 68428,
    "OrderDate": "2014/04/18",
    "SaleAmount": 10500,
    "ShippingAmount": 400,
    "TotalAmount": 10900,
    "Terms": "15 Days",
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Los Angeles",
    "Employee": "Harv Mudd"
}, {
    "ID": 43,
    "OrderNumber": 69477,
    "OrderDate": "2014/04/21",
    "SaleAmount": 14200,
    "ShippingAmount": 300,
    "TotalAmount": 14500,
    "Terms": "15 Days",
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Anaheim",
    "Employee": "Harv Mudd"
}, {
    "ID": 46,
    "OrderNumber": 72947,
    "OrderDate": "2014/05/22",
    "SaleAmount": 13350,
    "ShippingAmount": 300,
    "TotalAmount": 13650,
    "Terms": "30 Days",
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 47,
    "OrderNumber": 73088,
    "OrderDate": "2014/01/22",
    "SaleAmount": 8600,
    "ShippingAmount": 250,
    "TotalAmount": 8850,
    "Terms": "30 Days",
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Reno",
    "Employee": "Clark Morgan"
}, {
    "ID": 50,
    "OrderNumber": 76927,
    "OrderDate": "2010-10-17T00:00:00",
    "SaleAmount": 9800,
    "ShippingAmount": 250,
    "TotalAmount": 10050,
    "Terms": "30 Days",
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 51,
    "OrderNumber": 77297,
    "OrderDate": "2010-10-19T00:00:00",
    "SaleAmount": 10850,
    "ShippingAmount": 250,
    "TotalAmount": 11100,
    "Terms": "30 Days",
    "CustomerStoreState": "Arizona",
    "CustomerStoreCity": "Phoenix",
    "Employee": "Clark Morgan"
}, {
    "ID": 56,
    "OrderNumber": 84744,
    "OrderDate": "2014/01/02",
    "SaleAmount": 4650,
    "ShippingAmount": 100,
    "TotalAmount": 4750,
    "Terms": "30 Days",
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 57,
    "OrderNumber": 85028,
    "OrderDate": "2014/01/22",
    "SaleAmount": 2575,
    "ShippingAmount": 50,
    "TotalAmount": 2625,
    "Terms": "30 Days",
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Reno",
    "Employee": "Clark Morgan"
}, {
    "ID": 59,
    "OrderNumber": 87297,
    "OrderDate": "2014/03/04",
    "SaleAmount": 14200,
    "ShippingAmount": 200,
    "TotalAmount": 14400,
    "Terms": "30 Days",
    "CustomerStoreState": "Wyoming",
    "CustomerStoreCity": "Casper",
    "Employee": "Todd Hoffman"
}, {
    "ID": 60,
    "OrderNumber": 88027,
    "OrderDate": "2014/03/25",
    "SaleAmount": 13650,
    "ShippingAmount": 400,
    "TotalAmount": 14050,
    "Terms": "30 Days",
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 65,
    "OrderNumber": 94726,
    "OrderDate": "2014/03/18",
    "SaleAmount": 20500,
    "ShippingAmount": 300,
    "TotalAmount": 20800,
    "Terms": "15 Days",
    "CustomerStoreState": "California",
    "CustomerStoreCity": "San Jose",
    "Employee": "Jim Packard"
}, {
    "ID": 66,
    "OrderNumber": 95266,
    "OrderDate": "2014/02/06",
    "SaleAmount": 9050,
    "ShippingAmount": 200,
    "TotalAmount": 9250,
    "Terms": "15 Days",
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 69,
    "OrderNumber": 98477,
    "OrderDate": "2014/03/05",
    "SaleAmount": 23500,
    "ShippingAmount": 300,
    "TotalAmount": 23800,
    "Terms": "15 Days",
    "CustomerStoreState": "Wyoming",
    "CustomerStoreCity": "Casper",
    "Employee": "Todd Hoffman"
}, {
    "ID": 70,
    "OrderNumber": 99247,
    "OrderDate": "2014/01/03",
    "SaleAmount": 2100,
    "ShippingAmount": 50,
    "TotalAmount": 2150,
    "Terms": "15 Days",
    "CustomerStoreState": "Utah",
    "CustomerStoreCity": "Salt Lake City",
    "Employee": "Clark Morgan"
}, {
    "ID": 78,
    "OrderNumber": 174884,
    "OrderDate": "2014/01/10",
    "SaleAmount": 7200,
    "ShippingAmount": 150,
    "TotalAmount": 7350,
    "Terms": "30 Days",
    "CustomerStoreState": "Colorado",
    "CustomerStoreCity": "Denver",
    "Employee": "Todd Hoffman"
}, {
    "ID": 81,
    "OrderNumber": 188877,
    "OrderDate": "2014/01/14",
    "SaleAmount": 8750,
    "ShippingAmount": 150,
    "TotalAmount": 8900,
    "Terms": "30 Days",
    "CustomerStoreState": "Arizona",
    "CustomerStoreCity": "Phoenix",
    "Employee": "Clark Morgan"
}, {
    "ID": 82,
    "OrderNumber": 191883,
    "OrderDate": "2014/04/07",
    "SaleAmount": 9900,
    "ShippingAmount": 250,
    "TotalAmount": 10150,
    "Terms": "30 Days",
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Los Angeles",
    "Employee": "Harv Mudd"
}, {
    "ID": 83,
    "OrderNumber": 192474,
    "OrderDate": "2014/04/10",
    "SaleAmount": 12800,
    "ShippingAmount": 300,
    "TotalAmount": 13100,
    "Terms": "30 Days",
    "CustomerStoreState": "California",
    "CustomerStoreCity": "Anaheim",
    "Employee": "Harv Mudd"
}, {
    "ID": 84,
    "OrderNumber": 193847,
    "OrderDate": "2014/04/24",
    "SaleAmount": 14100,
    "ShippingAmount": 250,
    "TotalAmount": 14350,
    "Terms": "30 Days",
    "CustomerStoreState": "California",
    "CustomerStoreCity": "San Diego",
    "Employee": "Harv Mudd"
}, {
    "ID": 85,
    "OrderNumber": 194877,
    "OrderDate": "2014/02/28",
    "SaleAmount": 4750,
    "ShippingAmount": 200,
    "TotalAmount": 4950,
    "Terms": "30 Days",
    "CustomerStoreState": "California",
    "CustomerStoreCity": "San Jose",
    "Employee": "Jim Packard"
}, {
    "ID": 86,
    "OrderNumber": 195746,
    "OrderDate": "2014/01/05",
    "SaleAmount": 9050,
    "ShippingAmount": 200,
    "TotalAmount": 9250,
    "Terms": "30 Days",
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Las Vegas",
    "Employee": "Harv Mudd"
}, {
    "ID": 87,
    "OrderNumber": 197474,
    "OrderDate": "2014/05/10",
    "SaleAmount": 6400,
    "ShippingAmount": 200,
    "TotalAmount": 6600,
    "Terms": "30 Days",
    "CustomerStoreState": "Nevada",
    "CustomerStoreCity": "Reno",
    "Employee": "Clark Morgan"
}, {
    "ID": 88,
    "OrderNumber": 198746,
    "OrderDate": "2014/04/09",
    "SaleAmount": 15700,
    "ShippingAmount": 350,
    "TotalAmount": 16050,
    "Terms": "30 Days",
    "CustomerStoreState": "Colorado",
    "CustomerStoreCity": "Denver",
    "Employee": "Todd Hoffman"
}, {
    "ID": 91,
    "OrderNumber": 214222,
    "OrderDate": "2014/02/10",
    "SaleAmount": 11050,
    "ShippingAmount": 200,
    "TotalAmount": 11250,
    "Terms": "30 Days",
    "CustomerStoreState": "Arizona",
    "CustomerStoreCity": "Phoenix",
    "Employee": "Clark Morgan"
}];

@Injectable()
export class Service {
    getOrders() {
        return orders;
    }
}
