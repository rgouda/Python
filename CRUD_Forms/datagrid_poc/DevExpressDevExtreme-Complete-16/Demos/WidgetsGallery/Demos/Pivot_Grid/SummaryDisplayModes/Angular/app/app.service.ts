import { Injectable } from '@angular/core';

export class Sale {
    id: number;
    region: string;
    country: string;
    city: string;
    amount: number;
    date: Date;
}
let sales: Sale[] = [{
    "id": 1,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 1590,
    "date": new Date("2013/01/02")
}, {
    "id": 2,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 7725,
    "date": new Date("2013/01/18")
}, {
    "id": 3,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 2490,
    "date": new Date("2013/01/23")
}, {
    "id": 4,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 1515,
    "date": new Date("2013/01/12")
}, {
    "id": 5,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 1980,
    "date": new Date("2013/01/14")
}, {
    "id": 6,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 2420,
    "date": new Date("2013/01/16")
}, {
    "id": 7,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 780,
    "date": new Date("2013/01/12")
}, {
    "id": 8,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1660,
    "date": new Date("2013/01/19")
}, {
    "id": 9,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 3800,
    "date": new Date("2013/01/02")
}, {
    "id": 10,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 6425,
    "date": new Date("2013/01/14")
}, {
    "id": 11,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 3780,
    "date": new Date("2013/01/06")
}, {
    "id": 12,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 4660,
    "date": new Date("2013/01/22")
}, {
    "id": 13,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 8220,
    "date": new Date("2013/01/19")
}, {
    "id": 14,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 3930,
    "date": new Date("2013/01/06")
}, {
    "id": 15,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 2775,
    "date": new Date("2013/01/21")
}, {
    "id": 16,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 1080,
    "date": new Date("2013/01/14")
}, {
    "id": 17,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 2325,
    "date": new Date("2013/01/05")
}, {
    "id": 18,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 200,
    "date": new Date("2013/01/16")
}, {
    "id": 19,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 1990,
    "date": new Date("2013/01/18")
}, {
    "id": 20,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 1965,
    "date": new Date("2013/01/16")
}, {
    "id": 21,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 5425,
    "date": new Date("2013/01/09")
}, {
    "id": 22,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 3575,
    "date": new Date("2013/01/01")
}, {
    "id": 23,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 5700,
    "date": new Date("2013/01/25")
}, {
    "id": 24,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 7650,
    "date": new Date("2013/02/16")
}, {
    "id": 25,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 2400,
    "date": new Date("2013/02/26")
}, {
    "id": 26,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 4680,
    "date": new Date("2013/02/24")
}, {
    "id": 27,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 4740,
    "date": new Date("2013/02/25")
}, {
    "id": 28,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2190,
    "date": new Date("2013/02/25")
}, {
    "id": 29,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 5200,
    "date": new Date("2013/02/23")
}, {
    "id": 30,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 2250,
    "date": new Date("2013/02/12")
}, {
    "id": 31,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 570,
    "date": new Date("2013/02/26")
}, {
    "id": 32,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 5125,
    "date": new Date("2013/02/20")
}, {
    "id": 33,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 5450,
    "date": new Date("2013/02/04")
}, {
    "id": 34,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 6360,
    "date": new Date("2013/02/26")
}, {
    "id": 35,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 4060,
    "date": new Date("2013/02/08")
}, {
    "id": 36,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 2520,
    "date": new Date("2013/02/12")
}, {
    "id": 37,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 5220,
    "date": new Date("2013/02/16")
}, {
    "id": 38,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 5275,
    "date": new Date("2013/02/08")
}, {
    "id": 39,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 960,
    "date": new Date("2013/02/21")
}, {
    "id": 40,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 3870,
    "date": new Date("2013/02/19")
}, {
    "id": 41,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2830,
    "date": new Date("2013/02/14")
}, {
    "id": 42,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 930,
    "date": new Date("2013/02/06")
}, {
    "id": 43,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 3110,
    "date": new Date("2013/02/12")
}, {
    "id": 44,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 4740,
    "date": new Date("2013/02/03")
}, {
    "id": 45,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 3240,
    "date": new Date("2013/03/02")
}, {
    "id": 46,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 725,
    "date": new Date("2013/03/13")
}, {
    "id": 47,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 4140,
    "date": new Date("2013/03/08")
}, {
    "id": 48,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 495,
    "date": new Date("2013/03/01")
}, {
    "id": 49,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2270,
    "date": new Date("2013/03/01")
}, {
    "id": 50,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 4860,
    "date": new Date("2013/03/26")
}, {
    "id": 51,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 1845,
    "date": new Date("2013/03/26")
}, {
    "id": 52,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2620,
    "date": new Date("2013/03/15")
}, {
    "id": 53,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 1225,
    "date": new Date("2013/03/08")
}, {
    "id": 54,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 6775,
    "date": new Date("2013/03/07")
}, {
    "id": 55,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 3700,
    "date": new Date("2013/03/10")
}, {
    "id": 56,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 5740,
    "date": new Date("2013/03/12")
}, {
    "id": 57,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 1920,
    "date": new Date("2013/03/14")
}, {
    "id": 58,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 4920,
    "date": new Date("2013/03/04")
}, {
    "id": 59,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 4775,
    "date": new Date("2013/03/09")
}, {
    "id": 60,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 4200,
    "date": new Date("2013/03/04")
}, {
    "id": 61,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 450,
    "date": new Date("2013/03/06")
}, {
    "id": 62,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 820,
    "date": new Date("2013/03/09")
}, {
    "id": 63,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 2350,
    "date": new Date("2013/03/06")
}, {
    "id": 64,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 6690,
    "date": new Date("2013/04/24")
}, {
    "id": 65,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 3700,
    "date": new Date("2013/04/16")
}, {
    "id": 66,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 615,
    "date": new Date("2013/04/26")
}, {
    "id": 67,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 2445,
    "date": new Date("2013/04/13")
}, {
    "id": 68,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 1720,
    "date": new Date("2013/04/10")
}, {
    "id": 69,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 4480,
    "date": new Date("2013/04/25")
}, {
    "id": 70,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 360,
    "date": new Date("2013/04/10")
}, {
    "id": 71,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 750,
    "date": new Date("2013/04/13")
}, {
    "id": 72,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 5425,
    "date": new Date("2013/04/16")
}, {
    "id": 73,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 3275,
    "date": new Date("2013/04/26")
}, {
    "id": 74,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 4420,
    "date": new Date("2013/04/07")
}, {
    "id": 75,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 5520,
    "date": new Date("2013/04/08")
}, {
    "id": 76,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 7650,
    "date": new Date("2013/04/05")
}, {
    "id": 77,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 2010,
    "date": new Date("2013/04/16")
}, {
    "id": 78,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 2075,
    "date": new Date("2013/04/03")
}, {
    "id": 79,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 4800,
    "date": new Date("2013/04/24")
}, {
    "id": 80,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 1860,
    "date": new Date("2013/04/26")
}, {
    "id": 81,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 880,
    "date": new Date("2013/04/03")
}, {
    "id": 82,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 2250,
    "date": new Date("2013/04/22")
}, {
    "id": 83,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 1635,
    "date": new Date("2013/04/23")
}, {
    "id": 84,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 1880,
    "date": new Date("2013/04/11")
}, {
    "id": 85,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 3870,
    "date": new Date("2013/04/09")
}, {
    "id": 86,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 6300,
    "date": new Date("2013/04/07")
}, {
    "id": 87,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 7230,
    "date": new Date("2013/04/03")
}, {
    "id": 88,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2820,
    "date": new Date("2013/04/03")
}, {
    "id": 89,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 960,
    "date": new Date("2013/05/01")
}, {
    "id": 90,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 4275,
    "date": new Date("2013/05/07")
}, {
    "id": 91,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 1575,
    "date": new Date("2013/05/08")
}, {
    "id": 92,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 600,
    "date": new Date("2013/05/12")
}, {
    "id": 93,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2480,
    "date": new Date("2013/05/20")
}, {
    "id": 94,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 4060,
    "date": new Date("2013/05/26")
}, {
    "id": 95,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 2265,
    "date": new Date("2013/05/02")
}, {
    "id": 96,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 750,
    "date": new Date("2013/05/04")
}, {
    "id": 97,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 1825,
    "date": new Date("2013/05/17")
}, {
    "id": 98,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 7275,
    "date": new Date("2013/05/25")
}, {
    "id": 99,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 4680,
    "date": new Date("2013/05/06")
}, {
    "id": 100,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 1460,
    "date": new Date("2013/05/16")
}, {
    "id": 101,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 2400,
    "date": new Date("2013/05/09")
}, {
    "id": 102,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 4950,
    "date": new Date("2013/05/15")
}, {
    "id": 103,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 1350,
    "date": new Date("2013/05/25")
}, {
    "id": 104,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 1360,
    "date": new Date("2013/05/18")
}, {
    "id": 105,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 1575,
    "date": new Date("2013/05/22")
}, {
    "id": 106,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 1980,
    "date": new Date("2013/05/21")
}, {
    "id": 107,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 1930,
    "date": new Date("2013/05/09")
}, {
    "id": 108,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 3030,
    "date": new Date("2013/05/22")
}, {
    "id": 109,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 2430,
    "date": new Date("2013/06/16")
}, {
    "id": 110,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 4900,
    "date": new Date("2013/06/11")
}, {
    "id": 111,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 300,
    "date": new Date("2013/06/23")
}, {
    "id": 112,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 2325,
    "date": new Date("2013/06/20")
}, {
    "id": 113,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 350,
    "date": new Date("2013/06/14")
}, {
    "id": 114,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 2180,
    "date": new Date("2013/06/22")
}, {
    "id": 115,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 1350,
    "date": new Date("2013/06/26")
}, {
    "id": 116,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2930,
    "date": new Date("2013/06/02")
}, {
    "id": 117,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 4875,
    "date": new Date("2013/06/13")
}, {
    "id": 118,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 6950,
    "date": new Date("2013/06/12")
}, {
    "id": 119,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 2980,
    "date": new Date("2013/06/19")
}, {
    "id": 120,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 460,
    "date": new Date("2013/06/12")
}, {
    "id": 121,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 2370,
    "date": new Date("2013/06/12")
}, {
    "id": 122,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 5700,
    "date": new Date("2013/06/13")
}, {
    "id": 123,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 4625,
    "date": new Date("2013/06/10")
}, {
    "id": 124,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 6100,
    "date": new Date("2013/06/12")
}, {
    "id": 125,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 1140,
    "date": new Date("2013/06/01")
}, {
    "id": 126,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2410,
    "date": new Date("2013/06/26")
}, {
    "id": 127,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 260,
    "date": new Date("2013/06/04")
}, {
    "id": 128,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 3340,
    "date": new Date("2013/06/17")
}, {
    "id": 129,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 1620,
    "date": new Date("2013/06/13")
}, {
    "id": 130,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 4410,
    "date": new Date("2013/06/15")
}, {
    "id": 131,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 1720,
    "date": new Date("2013/06/04")
}, {
    "id": 132,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 7675,
    "date": new Date("2013/06/21")
}, {
    "id": 133,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 2700,
    "date": new Date("2013/06/06")
}, {
    "id": 134,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 7590,
    "date": new Date("2013/07/13")
}, {
    "id": 135,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 5875,
    "date": new Date("2013/07/19")
}, {
    "id": 136,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 555,
    "date": new Date("2013/07/01")
}, {
    "id": 137,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 780,
    "date": new Date("2013/07/06")
}, {
    "id": 138,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 1370,
    "date": new Date("2013/07/16")
}, {
    "id": 139,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 5760,
    "date": new Date("2013/07/05")
}, {
    "id": 140,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 3720,
    "date": new Date("2013/07/01")
}, {
    "id": 141,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 650,
    "date": new Date("2013/07/16")
}, {
    "id": 142,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 4550,
    "date": new Date("2013/07/13")
}, {
    "id": 143,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 3850,
    "date": new Date("2013/07/12")
}, {
    "id": 144,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 3260,
    "date": new Date("2013/07/07")
}, {
    "id": 145,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 940,
    "date": new Date("2013/07/13")
}, {
    "id": 146,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 8640,
    "date": new Date("2013/07/01")
}, {
    "id": 147,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 5040,
    "date": new Date("2013/07/26")
}, {
    "id": 148,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 5525,
    "date": new Date("2013/07/22")
}, {
    "id": 149,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 2540,
    "date": new Date("2013/07/13")
}, {
    "id": 150,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 480,
    "date": new Date("2013/07/08")
}, {
    "id": 151,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2310,
    "date": new Date("2013/07/05")
}, {
    "id": 152,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 2600,
    "date": new Date("2013/07/13")
}, {
    "id": 153,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 2520,
    "date": new Date("2013/07/22")
}, {
    "id": 154,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 660,
    "date": new Date("2013/07/14")
}, {
    "id": 155,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 6900,
    "date": new Date("2013/07/14")
}, {
    "id": 156,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 6360,
    "date": new Date("2013/08/20")
}, {
    "id": 157,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 2350,
    "date": new Date("2013/08/03")
}, {
    "id": 158,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 3885,
    "date": new Date("2013/08/12")
}, {
    "id": 159,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 1665,
    "date": new Date("2013/08/10")
}, {
    "id": 160,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2490,
    "date": new Date("2013/08/12")
}, {
    "id": 161,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 1760,
    "date": new Date("2013/08/05")
}, {
    "id": 162,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 4470,
    "date": new Date("2013/08/21")
}, {
    "id": 163,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2810,
    "date": new Date("2013/08/23")
}, {
    "id": 164,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 3225,
    "date": new Date("2013/08/18")
}, {
    "id": 165,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 1725,
    "date": new Date("2013/08/21")
}, {
    "id": 166,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 1360,
    "date": new Date("2013/08/11")
}, {
    "id": 167,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 4640,
    "date": new Date("2013/08/20")
}, {
    "id": 168,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 2910,
    "date": new Date("2013/08/13")
}, {
    "id": 169,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 9330,
    "date": new Date("2013/08/16")
}, {
    "id": 170,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 4075,
    "date": new Date("2013/08/14")
}, {
    "id": 171,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 3800,
    "date": new Date("2013/08/17")
}, {
    "id": 172,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 4500,
    "date": new Date("2013/08/22")
}, {
    "id": 173,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 480,
    "date": new Date("2013/08/14")
}, {
    "id": 174,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 1720,
    "date": new Date("2013/08/04")
}, {
    "id": 175,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 3475,
    "date": new Date("2013/08/14")
}, {
    "id": 176,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 6380,
    "date": new Date("2013/08/26")
}, {
    "id": 177,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 2640,
    "date": new Date("2013/09/06")
}, {
    "id": 178,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 6225,
    "date": new Date("2013/09/20")
}, {
    "id": 179,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 2655,
    "date": new Date("2013/09/07")
}, {
    "id": 180,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 3210,
    "date": new Date("2013/09/03")
}, {
    "id": 181,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2080,
    "date": new Date("2013/09/02")
}, {
    "id": 182,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 4880,
    "date": new Date("2013/09/04")
}, {
    "id": 183,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 4230,
    "date": new Date("2013/09/04")
}, {
    "id": 184,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 880,
    "date": new Date("2013/09/02")
}, {
    "id": 185,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 4000,
    "date": new Date("2013/09/03")
}, {
    "id": 186,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 5475,
    "date": new Date("2013/09/14")
}, {
    "id": 187,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 4980,
    "date": new Date("2013/09/16")
}, {
    "id": 188,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 640,
    "date": new Date("2013/09/22")
}, {
    "id": 189,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 7860,
    "date": new Date("2013/09/17")
}, {
    "id": 190,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 4650,
    "date": new Date("2013/09/06")
}, {
    "id": 191,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 6275,
    "date": new Date("2013/09/13")
}, {
    "id": 192,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 4900,
    "date": new Date("2013/09/25")
}, {
    "id": 193,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 1980,
    "date": new Date("2013/09/26")
}, {
    "id": 194,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2990,
    "date": new Date("2013/09/06")
}, {
    "id": 195,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 1110,
    "date": new Date("2013/09/09")
}, {
    "id": 196,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 2880,
    "date": new Date("2013/10/01")
}, {
    "id": 197,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 3625,
    "date": new Date("2013/10/15")
}, {
    "id": 198,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 2820,
    "date": new Date("2013/10/09")
}, {
    "id": 199,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 465,
    "date": new Date("2013/10/11")
}, {
    "id": 200,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 610,
    "date": new Date("2013/10/20")
}, {
    "id": 201,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 6140,
    "date": new Date("2013/10/08")
}, {
    "id": 202,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 3735,
    "date": new Date("2013/10/07")
}, {
    "id": 203,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2340,
    "date": new Date("2013/10/23")
}, {
    "id": 204,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 4525,
    "date": new Date("2013/10/01")
}, {
    "id": 205,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 1850,
    "date": new Date("2013/10/06")
}, {
    "id": 206,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 840,
    "date": new Date("2013/10/26")
}, {
    "id": 207,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 2980,
    "date": new Date("2013/10/18")
}, {
    "id": 208,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 2700,
    "date": new Date("2013/10/19")
}, {
    "id": 209,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 6270,
    "date": new Date("2013/10/12")
}, {
    "id": 210,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 3950,
    "date": new Date("2013/10/04")
}, {
    "id": 211,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 3000,
    "date": new Date("2013/10/16")
}, {
    "id": 212,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 4275,
    "date": new Date("2013/10/18")
}, {
    "id": 213,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 1930,
    "date": new Date("2013/10/05")
}, {
    "id": 214,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 2400,
    "date": new Date("2013/10/16")
}, {
    "id": 215,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 3375,
    "date": new Date("2013/10/17")
}, {
    "id": 216,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 7625,
    "date": new Date("2013/10/20")
}, {
    "id": 217,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 2625,
    "date": new Date("2013/10/18")
}, {
    "id": 218,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 6080,
    "date": new Date("2013/10/25")
}, {
    "id": 219,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 465,
    "date": new Date("2013/10/13")
}, {
    "id": 220,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 5940,
    "date": new Date("2013/11/22")
}, {
    "id": 221,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 5600,
    "date": new Date("2013/11/11")
}, {
    "id": 222,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 3210,
    "date": new Date("2013/11/21")
}, {
    "id": 223,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 2310,
    "date": new Date("2013/11/18")
}, {
    "id": 224,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 1320,
    "date": new Date("2013/11/15")
}, {
    "id": 225,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 4460,
    "date": new Date("2013/11/04")
}, {
    "id": 226,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 4485,
    "date": new Date("2013/11/13")
}, {
    "id": 227,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 3020,
    "date": new Date("2013/11/12")
}, {
    "id": 228,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 2075,
    "date": new Date("2013/11/25")
}, {
    "id": 229,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 7425,
    "date": new Date("2013/11/04")
}, {
    "id": 230,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 820,
    "date": new Date("2013/11/02")
}, {
    "id": 231,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 3360,
    "date": new Date("2013/11/01")
}, {
    "id": 232,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 6690,
    "date": new Date("2013/11/24")
}, {
    "id": 233,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 660,
    "date": new Date("2013/11/07")
}, {
    "id": 234,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 1225,
    "date": new Date("2013/11/17")
}, {
    "id": 235,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 6300,
    "date": new Date("2013/11/20")
}, {
    "id": 236,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 1560,
    "date": new Date("2013/11/23")
}, {
    "id": 237,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 3120,
    "date": new Date("2013/11/19")
}, {
    "id": 238,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 1930,
    "date": new Date("2013/11/15")
}, {
    "id": 239,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 2490,
    "date": new Date("2013/11/01")
}, {
    "id": 240,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 4710,
    "date": new Date("2013/11/18")
}, {
    "id": 241,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1500,
    "date": new Date("2013/11/14")
}, {
    "id": 242,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 1755,
    "date": new Date("2013/11/19")
}, {
    "id": 243,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 9300,
    "date": new Date("2013/12/12")
}, {
    "id": 244,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 3000,
    "date": new Date("2013/12/16")
}, {
    "id": 245,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 3360,
    "date": new Date("2013/12/13")
}, {
    "id": 246,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 1200,
    "date": new Date("2013/12/06")
}, {
    "id": 247,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2870,
    "date": new Date("2013/12/07")
}, {
    "id": 248,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 1300,
    "date": new Date("2013/12/21")
}, {
    "id": 249,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 2160,
    "date": new Date("2013/12/13")
}, {
    "id": 250,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1080,
    "date": new Date("2013/12/01")
}, {
    "id": 251,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 950,
    "date": new Date("2013/12/03")
}, {
    "id": 252,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 7300,
    "date": new Date("2013/12/11")
}, {
    "id": 253,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 4840,
    "date": new Date("2013/12/07")
}, {
    "id": 254,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 6180,
    "date": new Date("2013/12/16")
}, {
    "id": 255,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 5700,
    "date": new Date("2013/12/05")
}, {
    "id": 256,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 3150,
    "date": new Date("2013/12/02")
}, {
    "id": 257,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 2450,
    "date": new Date("2013/12/05")
}, {
    "id": 258,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 2580,
    "date": new Date("2013/12/12")
}, {
    "id": 259,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 2355,
    "date": new Date("2013/12/21")
}, {
    "id": 260,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 1420,
    "date": new Date("2013/12/01")
}, {
    "id": 261,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 210,
    "date": new Date("2013/12/08")
}, {
    "id": 262,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 1890,
    "date": new Date("2013/12/26")
}, {
    "id": 263,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 1010,
    "date": new Date("2013/12/14")
}, {
    "id": 264,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 4280,
    "date": new Date("2013/12/09")
}, {
    "id": 265,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 4700,
    "date": new Date("2013/12/13")
}, {
    "id": 266,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 2400,
    "date": new Date("2013/12/12")
}, {
    "id": 267,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 9210,
    "date": new Date("2014/01/22")
}, {
    "id": 268,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 2350,
    "date": new Date("2014/01/22")
}, {
    "id": 269,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 2700,
    "date": new Date("2014/01/08")
}, {
    "id": 270,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 2775,
    "date": new Date("2014/01/13")
}, {
    "id": 271,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2860,
    "date": new Date("2014/01/01")
}, {
    "id": 272,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 3320,
    "date": new Date("2014/01/14")
}, {
    "id": 273,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 2760,
    "date": new Date("2014/01/12")
}, {
    "id": 274,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 540,
    "date": new Date("2014/01/08")
}, {
    "id": 275,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 3650,
    "date": new Date("2014/01/23")
}, {
    "id": 276,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 1750,
    "date": new Date("2014/01/09")
}, {
    "id": 277,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 6180,
    "date": new Date("2014/01/20")
}, {
    "id": 278,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 3620,
    "date": new Date("2014/01/16")
}, {
    "id": 279,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 2370,
    "date": new Date("2014/01/07")
}, {
    "id": 280,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 1140,
    "date": new Date("2014/01/22")
}, {
    "id": 281,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 1750,
    "date": new Date("2014/01/25")
}, {
    "id": 282,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 4500,
    "date": new Date("2014/01/02")
}, {
    "id": 283,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 315,
    "date": new Date("2014/01/26")
}, {
    "id": 284,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 3060,
    "date": new Date("2014/01/15")
}, {
    "id": 285,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 790,
    "date": new Date("2014/01/22")
}, {
    "id": 286,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 1605,
    "date": new Date("2014/01/23")
}, {
    "id": 287,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 5640,
    "date": new Date("2014/02/20")
}, {
    "id": 288,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 6625,
    "date": new Date("2014/02/10")
}, {
    "id": 289,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 2145,
    "date": new Date("2014/02/01")
}, {
    "id": 290,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 2295,
    "date": new Date("2014/02/13")
}, {
    "id": 291,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2990,
    "date": new Date("2014/02/20")
}, {
    "id": 292,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 6360,
    "date": new Date("2014/02/09")
}, {
    "id": 293,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 2805,
    "date": new Date("2014/02/08")
}, {
    "id": 294,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 3150,
    "date": new Date("2014/02/16")
}, {
    "id": 295,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 4350,
    "date": new Date("2014/02/12")
}, {
    "id": 296,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 3650,
    "date": new Date("2014/02/26")
}, {
    "id": 297,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 800,
    "date": new Date("2014/02/13")
}, {
    "id": 298,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 2640,
    "date": new Date("2014/02/21")
}, {
    "id": 299,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 9540,
    "date": new Date("2014/02/20")
}, {
    "id": 300,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 6990,
    "date": new Date("2014/02/21")
}, {
    "id": 301,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 4250,
    "date": new Date("2014/02/23")
}, {
    "id": 302,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 3200,
    "date": new Date("2014/02/16")
}, {
    "id": 303,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 2895,
    "date": new Date("2014/02/17")
}, {
    "id": 304,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2890,
    "date": new Date("2014/02/03")
}, {
    "id": 305,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 1920,
    "date": new Date("2014/02/21")
}, {
    "id": 306,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 2160,
    "date": new Date("2014/03/18")
}, {
    "id": 307,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 2650,
    "date": new Date("2014/03/09")
}, {
    "id": 308,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 720,
    "date": new Date("2014/03/20")
}, {
    "id": 309,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 2925,
    "date": new Date("2014/03/20")
}, {
    "id": 310,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 3100,
    "date": new Date("2014/03/01")
}, {
    "id": 311,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 4940,
    "date": new Date("2014/03/22")
}, {
    "id": 312,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 4755,
    "date": new Date("2014/03/19")
}, {
    "id": 313,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2640,
    "date": new Date("2014/03/05")
}, {
    "id": 314,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 7125,
    "date": new Date("2014/03/15")
}, {
    "id": 315,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 3725,
    "date": new Date("2014/03/26")
}, {
    "id": 316,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 640,
    "date": new Date("2014/03/18")
}, {
    "id": 317,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 4880,
    "date": new Date("2014/03/24")
}, {
    "id": 318,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 4260,
    "date": new Date("2014/03/03")
}, {
    "id": 319,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 9000,
    "date": new Date("2014/03/04")
}, {
    "id": 320,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 5450,
    "date": new Date("2014/03/10")
}, {
    "id": 321,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 2860,
    "date": new Date("2014/03/18")
}, {
    "id": 322,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 420,
    "date": new Date("2014/03/20")
}, {
    "id": 323,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2220,
    "date": new Date("2014/03/18")
}, {
    "id": 324,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 1480,
    "date": new Date("2014/03/09")
}, {
    "id": 325,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 8820,
    "date": new Date("2014/04/16")
}, {
    "id": 326,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 6625,
    "date": new Date("2014/04/08")
}, {
    "id": 327,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 1590,
    "date": new Date("2014/04/25")
}, {
    "id": 328,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 4305,
    "date": new Date("2014/04/16")
}, {
    "id": 329,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 1240,
    "date": new Date("2014/04/10")
}, {
    "id": 330,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 1000,
    "date": new Date("2014/04/12")
}, {
    "id": 331,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 1560,
    "date": new Date("2014/04/19")
}, {
    "id": 332,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2580,
    "date": new Date("2014/04/19")
}, {
    "id": 333,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 1625,
    "date": new Date("2014/04/23")
}, {
    "id": 334,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 3475,
    "date": new Date("2014/04/25")
}, {
    "id": 335,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 5960,
    "date": new Date("2014/04/08")
}, {
    "id": 336,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 4540,
    "date": new Date("2014/04/02")
}, {
    "id": 337,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 2850,
    "date": new Date("2014/04/19")
}, {
    "id": 338,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 4350,
    "date": new Date("2014/04/20")
}, {
    "id": 339,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 7800,
    "date": new Date("2014/04/05")
}, {
    "id": 340,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 3640,
    "date": new Date("2014/04/20")
}, {
    "id": 341,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 630,
    "date": new Date("2014/04/14")
}, {
    "id": 342,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 3170,
    "date": new Date("2014/04/10")
}, {
    "id": 343,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 1200,
    "date": new Date("2014/04/23")
}, {
    "id": 344,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 4215,
    "date": new Date("2014/04/19")
}, {
    "id": 345,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 3975,
    "date": new Date("2014/04/21")
}, {
    "id": 346,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 9480,
    "date": new Date("2014/05/05")
}, {
    "id": 347,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 5475,
    "date": new Date("2014/05/13")
}, {
    "id": 348,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 4035,
    "date": new Date("2014/05/03")
}, {
    "id": 349,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 3750,
    "date": new Date("2014/05/07")
}, {
    "id": 350,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 1590,
    "date": new Date("2014/05/09")
}, {
    "id": 351,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 3460,
    "date": new Date("2014/05/02")
}, {
    "id": 352,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 960,
    "date": new Date("2014/05/15")
}, {
    "id": 353,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1240,
    "date": new Date("2014/05/23")
}, {
    "id": 354,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 1625,
    "date": new Date("2014/05/06")
}, {
    "id": 355,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 1250,
    "date": new Date("2014/05/11")
}, {
    "id": 356,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 3740,
    "date": new Date("2014/05/15")
}, {
    "id": 357,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 3860,
    "date": new Date("2014/05/05")
}, {
    "id": 358,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 7980,
    "date": new Date("2014/05/22")
}, {
    "id": 359,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 1140,
    "date": new Date("2014/05/07")
}, {
    "id": 360,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 2750,
    "date": new Date("2014/05/11")
}, {
    "id": 361,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 2100,
    "date": new Date("2014/05/25")
}, {
    "id": 362,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 3630,
    "date": new Date("2014/05/14")
}, {
    "id": 363,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2760,
    "date": new Date("2014/05/07")
}, {
    "id": 364,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 3010,
    "date": new Date("2014/05/03")
}, {
    "id": 365,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 4750,
    "date": new Date("2014/05/02")
}, {
    "id": 366,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 420,
    "date": new Date("2014/05/22")
}, {
    "id": 367,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 2745,
    "date": new Date("2014/05/06")
}, {
    "id": 368,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1510,
    "date": new Date("2014/05/15")
}, {
    "id": 369,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 795,
    "date": new Date("2014/05/21")
}, {
    "id": 370,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 1670,
    "date": new Date("2014/05/23")
}, {
    "id": 371,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 5130,
    "date": new Date("2014/06/10")
}, {
    "id": 372,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 7125,
    "date": new Date("2014/06/04")
}, {
    "id": 373,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 4545,
    "date": new Date("2014/06/19")
}, {
    "id": 374,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 810,
    "date": new Date("2014/06/26")
}, {
    "id": 375,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 430,
    "date": new Date("2014/06/10")
}, {
    "id": 376,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 2920,
    "date": new Date("2014/06/17")
}, {
    "id": 377,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 2355,
    "date": new Date("2014/06/01")
}, {
    "id": 378,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1300,
    "date": new Date("2014/06/07")
}, {
    "id": 379,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 2100,
    "date": new Date("2014/06/15")
}, {
    "id": 380,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 7475,
    "date": new Date("2014/06/03")
}, {
    "id": 381,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 5360,
    "date": new Date("2014/06/04")
}, {
    "id": 382,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 1480,
    "date": new Date("2014/06/13")
}, {
    "id": 383,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 8160,
    "date": new Date("2014/06/25")
}, {
    "id": 384,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 8040,
    "date": new Date("2014/06/07")
}, {
    "id": 385,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 3800,
    "date": new Date("2014/06/05")
}, {
    "id": 386,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 2060,
    "date": new Date("2014/06/25")
}, {
    "id": 387,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 2790,
    "date": new Date("2014/06/25")
}, {
    "id": 388,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2790,
    "date": new Date("2014/06/01")
}, {
    "id": 389,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 2010,
    "date": new Date("2014/06/11")
}, {
    "id": 390,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 5080,
    "date": new Date("2014/06/06")
}, {
    "id": 391,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 6975,
    "date": new Date("2014/06/07")
}, {
    "id": 392,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 2560,
    "date": new Date("2014/06/16")
}, {
    "id": 393,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 4860,
    "date": new Date("2014/06/22")
}, {
    "id": 394,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 1890,
    "date": new Date("2014/07/13")
}, {
    "id": 395,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 6600,
    "date": new Date("2014/07/06")
}, {
    "id": 396,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 3450,
    "date": new Date("2014/07/08")
}, {
    "id": 397,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 4500,
    "date": new Date("2014/07/11")
}, {
    "id": 398,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 1590,
    "date": new Date("2014/07/26")
}, {
    "id": 399,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 6360,
    "date": new Date("2014/07/18")
}, {
    "id": 400,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 1560,
    "date": new Date("2014/07/23")
}, {
    "id": 401,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 210,
    "date": new Date("2014/07/14")
}, {
    "id": 402,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 700,
    "date": new Date("2014/07/14")
}, {
    "id": 403,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 3750,
    "date": new Date("2014/07/08")
}, {
    "id": 404,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 2600,
    "date": new Date("2014/07/10")
}, {
    "id": 405,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 5920,
    "date": new Date("2014/07/14")
}, {
    "id": 406,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 8730,
    "date": new Date("2014/07/10")
}, {
    "id": 407,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 2490,
    "date": new Date("2014/07/24")
}, {
    "id": 408,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 1475,
    "date": new Date("2014/07/05")
}, {
    "id": 409,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 6260,
    "date": new Date("2014/07/24")
}, {
    "id": 410,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 3315,
    "date": new Date("2014/07/07")
}, {
    "id": 411,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2160,
    "date": new Date("2014/07/24")
}, {
    "id": 412,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 2790,
    "date": new Date("2014/07/03")
}, {
    "id": 413,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 1650,
    "date": new Date("2014/07/15")
}, {
    "id": 414,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 3620,
    "date": new Date("2014/07/17")
}, {
    "id": 415,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 2200,
    "date": new Date("2014/07/21")
}, {
    "id": 416,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 5580,
    "date": new Date("2014/08/04")
}, {
    "id": 417,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 3825,
    "date": new Date("2014/08/18")
}, {
    "id": 418,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 1650,
    "date": new Date("2014/08/21")
}, {
    "id": 419,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 3825,
    "date": new Date("2014/08/20")
}, {
    "id": 420,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 460,
    "date": new Date("2014/08/09")
}, {
    "id": 421,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 880,
    "date": new Date("2014/08/08")
}, {
    "id": 422,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 3645,
    "date": new Date("2014/08/08")
}, {
    "id": 423,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2010,
    "date": new Date("2014/08/06")
}, {
    "id": 424,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 7375,
    "date": new Date("2014/08/03")
}, {
    "id": 425,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 600,
    "date": new Date("2014/08/08")
}, {
    "id": 426,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 2700,
    "date": new Date("2014/08/10")
}, {
    "id": 427,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 4720,
    "date": new Date("2014/08/15")
}, {
    "id": 428,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 8070,
    "date": new Date("2014/08/07")
}, {
    "id": 429,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 4530,
    "date": new Date("2014/08/26")
}, {
    "id": 430,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 5925,
    "date": new Date("2014/08/22")
}, {
    "id": 431,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 5320,
    "date": new Date("2014/08/17")
}, {
    "id": 432,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 2895,
    "date": new Date("2014/08/17")
}, {
    "id": 433,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 1990,
    "date": new Date("2014/08/14")
}, {
    "id": 434,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 710,
    "date": new Date("2014/08/05")
}, {
    "id": 435,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 5280,
    "date": new Date("2014/09/17")
}, {
    "id": 436,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 1825,
    "date": new Date("2014/09/26")
}, {
    "id": 437,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 4215,
    "date": new Date("2014/09/16")
}, {
    "id": 438,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 2070,
    "date": new Date("2014/09/16")
}, {
    "id": 439,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 680,
    "date": new Date("2014/09/03")
}, {
    "id": 440,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 540,
    "date": new Date("2014/09/19")
}, {
    "id": 441,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 4725,
    "date": new Date("2014/09/12")
}, {
    "id": 442,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 730,
    "date": new Date("2014/09/13")
}, {
    "id": 443,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 4400,
    "date": new Date("2014/09/02")
}, {
    "id": 444,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 6100,
    "date": new Date("2014/09/02")
}, {
    "id": 445,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 2660,
    "date": new Date("2014/09/21")
}, {
    "id": 446,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 3120,
    "date": new Date("2014/09/09")
}, {
    "id": 447,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 5670,
    "date": new Date("2014/09/14")
}, {
    "id": 448,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 6480,
    "date": new Date("2014/09/14")
}, {
    "id": 449,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 5825,
    "date": new Date("2014/09/10")
}, {
    "id": 450,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 3500,
    "date": new Date("2014/09/11")
}, {
    "id": 451,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 1620,
    "date": new Date("2014/09/03")
}, {
    "id": 452,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 1670,
    "date": new Date("2014/09/20")
}, {
    "id": 453,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 2320,
    "date": new Date("2014/09/24")
}, {
    "id": 454,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 4040,
    "date": new Date("2014/09/11")
}, {
    "id": 455,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 4560,
    "date": new Date("2014/09/24")
}, {
    "id": 456,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 1580,
    "date": new Date("2014/09/18")
}, {
    "id": 457,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 750,
    "date": new Date("2014/09/12")
}, {
    "id": 458,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 5025,
    "date": new Date("2014/09/26")
}, {
    "id": 459,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 2450,
    "date": new Date("2014/09/10")
}, {
    "id": 460,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 4650,
    "date": new Date("2014/10/12")
}, {
    "id": 461,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 3325,
    "date": new Date("2014/10/13")
}, {
    "id": 462,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 1110,
    "date": new Date("2014/10/26")
}, {
    "id": 463,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 3810,
    "date": new Date("2014/10/12")
}, {
    "id": 464,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2220,
    "date": new Date("2014/10/02")
}, {
    "id": 465,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 2880,
    "date": new Date("2014/10/03")
}, {
    "id": 466,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 3420,
    "date": new Date("2014/10/02")
}, {
    "id": 467,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1300,
    "date": new Date("2014/10/17")
}, {
    "id": 468,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 5600,
    "date": new Date("2014/10/06")
}, {
    "id": 469,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 5900,
    "date": new Date("2014/10/04")
}, {
    "id": 470,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 1900,
    "date": new Date("2014/10/06")
}, {
    "id": 471,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 2860,
    "date": new Date("2014/10/14")
}, {
    "id": 472,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 3990,
    "date": new Date("2014/10/22")
}, {
    "id": 473,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 3930,
    "date": new Date("2014/10/21")
}, {
    "id": 474,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 4475,
    "date": new Date("2014/10/24")
}, {
    "id": 475,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 5220,
    "date": new Date("2014/10/13")
}, {
    "id": 476,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 4185,
    "date": new Date("2014/10/24")
}, {
    "id": 477,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 840,
    "date": new Date("2014/10/12")
}, {
    "id": 478,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 2790,
    "date": new Date("2014/10/25")
}, {
    "id": 479,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 3855,
    "date": new Date("2014/10/15")
}, {
    "id": 480,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 4830,
    "date": new Date("2014/11/05")
}, {
    "id": 481,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 3450,
    "date": new Date("2014/11/02")
}, {
    "id": 482,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 2595,
    "date": new Date("2014/11/13")
}, {
    "id": 483,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 4410,
    "date": new Date("2014/11/08")
}, {
    "id": 484,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 410,
    "date": new Date("2014/11/12")
}, {
    "id": 485,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 4060,
    "date": new Date("2014/11/02")
}, {
    "id": 486,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 750,
    "date": new Date("2014/11/15")
}, {
    "id": 487,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2390,
    "date": new Date("2014/11/03")
}, {
    "id": 488,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 3250,
    "date": new Date("2014/11/14")
}, {
    "id": 489,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 1850,
    "date": new Date("2014/11/06")
}, {
    "id": 490,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 2480,
    "date": new Date("2014/11/26")
}, {
    "id": 491,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 3740,
    "date": new Date("2014/11/04")
}, {
    "id": 492,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 7560,
    "date": new Date("2014/11/19")
}, {
    "id": 493,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 9270,
    "date": new Date("2014/11/01")
}, {
    "id": 494,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 2525,
    "date": new Date("2014/11/14")
}, {
    "id": 495,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 520,
    "date": new Date("2014/11/13")
}, {
    "id": 496,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 750,
    "date": new Date("2014/11/09")
}, {
    "id": 497,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 1980,
    "date": new Date("2014/11/09")
}, {
    "id": 498,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 1380,
    "date": new Date("2014/11/09")
}, {
    "id": 499,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 1900,
    "date": new Date("2014/11/04")
}, {
    "id": 500,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 930,
    "date": new Date("2014/11/16")
}, {
    "id": 501,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 3150,
    "date": new Date("2014/11/11")
}, {
    "id": 502,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2860,
    "date": new Date("2014/11/01")
}, {
    "id": 503,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 1890,
    "date": new Date("2014/11/06")
}, {
    "id": 504,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 5400,
    "date": new Date("2014/12/06")
}, {
    "id": 505,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 5800,
    "date": new Date("2014/12/01")
}, {
    "id": 506,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 2760,
    "date": new Date("2014/12/16")
}, {
    "id": 507,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 705,
    "date": new Date("2014/12/19")
}, {
    "id": 508,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2580,
    "date": new Date("2014/12/03")
}, {
    "id": 509,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 3560,
    "date": new Date("2014/12/13")
}, {
    "id": 510,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 4350,
    "date": new Date("2014/12/23")
}, {
    "id": 511,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1140,
    "date": new Date("2014/12/11")
}, {
    "id": 512,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 7200,
    "date": new Date("2014/12/26")
}, {
    "id": 513,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 6625,
    "date": new Date("2014/12/24")
}, {
    "id": 514,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 4300,
    "date": new Date("2014/12/09")
}, {
    "id": 515,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 2280,
    "date": new Date("2014/12/05")
}, {
    "id": 516,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 4860,
    "date": new Date("2014/12/22")
}, {
    "id": 517,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 5370,
    "date": new Date("2014/12/19")
}, {
    "id": 518,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 2325,
    "date": new Date("2014/12/01")
}, {
    "id": 519,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 1380,
    "date": new Date("2014/12/19")
}, {
    "id": 520,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 540,
    "date": new Date("2014/12/04")
}, {
    "id": 521,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 1140,
    "date": new Date("2014/12/04")
}, {
    "id": 522,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 940,
    "date": new Date("2014/12/25")
}, {
    "id": 523,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 870,
    "date": new Date("2014/12/24")
}, {
    "id": 524,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 6540,
    "date": new Date("2014/12/06")
}, {
    "id": 525,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 2580,
    "date": new Date("2014/12/12")
}, {
    "id": 526,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 2100,
    "date": new Date("2014/12/01")
}, {
    "id": 527,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 6140,
    "date": new Date("2014/12/11")
}, {
    "id": 528,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 660,
    "date": new Date("2014/12/21")
}, {
    "id": 529,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 8760,
    "date": new Date("2015/01/02")
}, {
    "id": 530,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 7525,
    "date": new Date("2015/01/10")
}, {
    "id": 531,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 2520,
    "date": new Date("2015/01/03")
}, {
    "id": 532,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 1935,
    "date": new Date("2015/01/04")
}, {
    "id": 533,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 1710,
    "date": new Date("2015/01/25")
}, {
    "id": 534,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 1620,
    "date": new Date("2015/01/02")
}, {
    "id": 535,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 420,
    "date": new Date("2015/01/11")
}, {
    "id": 536,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 620,
    "date": new Date("2015/01/19")
}, {
    "id": 537,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 7875,
    "date": new Date("2015/01/04")
}, {
    "id": 538,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 1025,
    "date": new Date("2015/01/08")
}, {
    "id": 539,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 3960,
    "date": new Date("2015/01/04")
}, {
    "id": 540,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 4120,
    "date": new Date("2015/01/15")
}, {
    "id": 541,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 810,
    "date": new Date("2015/01/24")
}, {
    "id": 542,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 7440,
    "date": new Date("2015/01/07")
}, {
    "id": 543,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 4025,
    "date": new Date("2015/01/25")
}, {
    "id": 544,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 5120,
    "date": new Date("2015/01/26")
}, {
    "id": 545,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 1350,
    "date": new Date("2015/01/13")
}, {
    "id": 546,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 320,
    "date": new Date("2015/01/02")
}, {
    "id": 547,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 2090,
    "date": new Date("2015/01/08")
}, {
    "id": 548,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 3180,
    "date": new Date("2015/01/11")
}, {
    "id": 549,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 7600,
    "date": new Date("2015/01/05")
}, {
    "id": 550,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 5550,
    "date": new Date("2015/01/04")
}, {
    "id": 551,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 3300,
    "date": new Date("2015/01/19")
}, {
    "id": 552,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 6090,
    "date": new Date("2015/02/24")
}, {
    "id": 553,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 1325,
    "date": new Date("2015/02/18")
}, {
    "id": 554,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 3465,
    "date": new Date("2015/02/16")
}, {
    "id": 555,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 3375,
    "date": new Date("2015/02/21")
}, {
    "id": 556,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2940,
    "date": new Date("2015/02/14")
}, {
    "id": 557,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 2100,
    "date": new Date("2015/02/15")
}, {
    "id": 558,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 2220,
    "date": new Date("2015/02/01")
}, {
    "id": 559,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 3070,
    "date": new Date("2015/02/23")
}, {
    "id": 560,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 2175,
    "date": new Date("2015/02/02")
}, {
    "id": 561,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 3350,
    "date": new Date("2015/02/15")
}, {
    "id": 562,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 2380,
    "date": new Date("2015/02/19")
}, {
    "id": 563,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 1880,
    "date": new Date("2015/02/15")
}, {
    "id": 564,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 9390,
    "date": new Date("2015/02/12")
}, {
    "id": 565,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 8190,
    "date": new Date("2015/02/21")
}, {
    "id": 566,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 7725,
    "date": new Date("2015/02/03")
}, {
    "id": 567,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 860,
    "date": new Date("2015/02/21")
}, {
    "id": 568,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 3405,
    "date": new Date("2015/02/13")
}, {
    "id": 569,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2230,
    "date": new Date("2015/02/20")
}, {
    "id": 570,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 550,
    "date": new Date("2015/02/04")
}, {
    "id": 571,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 4080,
    "date": new Date("2015/02/03")
}, {
    "id": 572,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 1100,
    "date": new Date("2015/02/15")
}, {
    "id": 573,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 8670,
    "date": new Date("2015/02/09")
}, {
    "id": 574,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2100,
    "date": new Date("2015/02/22")
}, {
    "id": 575,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 2790,
    "date": new Date("2015/02/12")
}, {
    "id": 576,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 9570,
    "date": new Date("2015/03/15")
}, {
    "id": 577,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 2100,
    "date": new Date("2015/03/14")
}, {
    "id": 578,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 4440,
    "date": new Date("2015/03/12")
}, {
    "id": 579,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 1170,
    "date": new Date("2015/03/13")
}, {
    "id": 580,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 710,
    "date": new Date("2015/03/15")
}, {
    "id": 581,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 1760,
    "date": new Date("2015/03/20")
}, {
    "id": 582,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 1335,
    "date": new Date("2015/03/03")
}, {
    "id": 583,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 320,
    "date": new Date("2015/03/19")
}, {
    "id": 584,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 5425,
    "date": new Date("2015/03/15")
}, {
    "id": 585,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 4000,
    "date": new Date("2015/03/19")
}, {
    "id": 586,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 860,
    "date": new Date("2015/03/04")
}, {
    "id": 587,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 2440,
    "date": new Date("2015/03/14")
}, {
    "id": 588,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 7890,
    "date": new Date("2015/03/25")
}, {
    "id": 589,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 7710,
    "date": new Date("2015/03/10")
}, {
    "id": 590,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 4325,
    "date": new Date("2015/03/23")
}, {
    "id": 591,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 5920,
    "date": new Date("2015/03/05")
}, {
    "id": 592,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 1635,
    "date": new Date("2015/03/08")
}, {
    "id": 593,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 230,
    "date": new Date("2015/03/02")
}, {
    "id": 594,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 2520,
    "date": new Date("2015/03/23")
}, {
    "id": 595,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 2975,
    "date": new Date("2015/03/16")
}, {
    "id": 596,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 4365,
    "date": new Date("2015/03/01")
}, {
    "id": 597,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 630,
    "date": new Date("2015/04/02")
}, {
    "id": 598,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 1450,
    "date": new Date("2015/04/20")
}, {
    "id": 599,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 735,
    "date": new Date("2015/04/18")
}, {
    "id": 600,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 375,
    "date": new Date("2015/04/08")
}, {
    "id": 601,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2500,
    "date": new Date("2015/04/15")
}, {
    "id": 602,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 2960,
    "date": new Date("2015/04/15")
}, {
    "id": 603,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 3300,
    "date": new Date("2015/04/02")
}, {
    "id": 604,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 440,
    "date": new Date("2015/04/05")
}, {
    "id": 605,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 4450,
    "date": new Date("2015/04/07")
}, {
    "id": 606,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 525,
    "date": new Date("2015/04/13")
}, {
    "id": 607,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 5660,
    "date": new Date("2015/04/26")
}, {
    "id": 608,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 1480,
    "date": new Date("2015/04/13")
}, {
    "id": 609,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 2460,
    "date": new Date("2015/04/08")
}, {
    "id": 610,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 3390,
    "date": new Date("2015/04/20")
}, {
    "id": 611,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 6725,
    "date": new Date("2015/04/23")
}, {
    "id": 612,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 3360,
    "date": new Date("2015/04/14")
}, {
    "id": 613,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 3960,
    "date": new Date("2015/04/08")
}, {
    "id": 614,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2350,
    "date": new Date("2015/04/18")
}, {
    "id": 615,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 850,
    "date": new Date("2015/04/23")
}, {
    "id": 616,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 1330,
    "date": new Date("2015/04/04")
}, {
    "id": 617,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 1960,
    "date": new Date("2015/04/01")
}, {
    "id": 618,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1170,
    "date": new Date("2015/04/04")
}, {
    "id": 619,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 8850,
    "date": new Date("2015/05/18")
}, {
    "id": 620,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 5250,
    "date": new Date("2015/05/23")
}, {
    "id": 621,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 1230,
    "date": new Date("2015/05/11")
}, {
    "id": 622,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 3705,
    "date": new Date("2015/05/14")
}, {
    "id": 623,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2940,
    "date": new Date("2015/05/06")
}, {
    "id": 624,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 4880,
    "date": new Date("2015/05/07")
}, {
    "id": 625,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 3915,
    "date": new Date("2015/05/25")
}, {
    "id": 626,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2370,
    "date": new Date("2015/05/20")
}, {
    "id": 627,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 5750,
    "date": new Date("2015/05/25")
}, {
    "id": 628,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 4050,
    "date": new Date("2015/05/21")
}, {
    "id": 629,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 3320,
    "date": new Date("2015/05/16")
}, {
    "id": 630,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 5840,
    "date": new Date("2015/05/17")
}, {
    "id": 631,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 1410,
    "date": new Date("2015/05/26")
}, {
    "id": 632,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 6060,
    "date": new Date("2015/05/05")
}, {
    "id": 633,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 6425,
    "date": new Date("2015/05/21")
}, {
    "id": 634,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 2380,
    "date": new Date("2015/05/20")
}, {
    "id": 635,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 2175,
    "date": new Date("2015/05/16")
}, {
    "id": 636,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 1680,
    "date": new Date("2015/05/09")
}, {
    "id": 637,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 2530,
    "date": new Date("2015/05/13")
}, {
    "id": 638,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 3090,
    "date": new Date("2015/05/12")
}, {
    "id": 639,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 8010,
    "date": new Date("2015/06/13")
}, {
    "id": 640,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 6050,
    "date": new Date("2015/06/14")
}, {
    "id": 641,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 3540,
    "date": new Date("2015/06/13")
}, {
    "id": 642,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 2415,
    "date": new Date("2015/06/01")
}, {
    "id": 643,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 1990,
    "date": new Date("2015/06/14")
}, {
    "id": 644,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 4480,
    "date": new Date("2015/06/01")
}, {
    "id": 645,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 630,
    "date": new Date("2015/06/16")
}, {
    "id": 646,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1470,
    "date": new Date("2015/06/18")
}, {
    "id": 647,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 2000,
    "date": new Date("2015/06/20")
}, {
    "id": 648,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 3325,
    "date": new Date("2015/06/21")
}, {
    "id": 649,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 500,
    "date": new Date("2015/06/20")
}, {
    "id": 650,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 3960,
    "date": new Date("2015/06/02")
}, {
    "id": 651,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 4140,
    "date": new Date("2015/06/02")
}, {
    "id": 652,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 4500,
    "date": new Date("2015/06/23")
}, {
    "id": 653,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 5975,
    "date": new Date("2015/06/04")
}, {
    "id": 654,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 3500,
    "date": new Date("2015/06/19")
}, {
    "id": 655,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 4695,
    "date": new Date("2015/06/05")
}, {
    "id": 656,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 3790,
    "date": new Date("2015/06/09")
}, {
    "id": 657,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 260,
    "date": new Date("2015/06/03")
}, {
    "id": 658,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 540,
    "date": new Date("2015/06/06")
}, {
    "id": 659,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 6900,
    "date": new Date("2015/07/11")
}, {
    "id": 660,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 1200,
    "date": new Date("2015/07/08")
}, {
    "id": 661,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 300,
    "date": new Date("2015/07/24")
}, {
    "id": 662,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 795,
    "date": new Date("2015/07/14")
}, {
    "id": 663,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 1890,
    "date": new Date("2015/07/13")
}, {
    "id": 664,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 5120,
    "date": new Date("2015/07/19")
}, {
    "id": 665,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 3885,
    "date": new Date("2015/07/06")
}, {
    "id": 666,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1080,
    "date": new Date("2015/07/10")
}, {
    "id": 667,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 6025,
    "date": new Date("2015/07/08")
}, {
    "id": 668,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 4150,
    "date": new Date("2015/07/07")
}, {
    "id": 669,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 4200,
    "date": new Date("2015/07/01")
}, {
    "id": 670,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 1780,
    "date": new Date("2015/07/02")
}, {
    "id": 671,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 5700,
    "date": new Date("2015/07/02")
}, {
    "id": 672,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 2010,
    "date": new Date("2015/07/10")
}, {
    "id": 673,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 550,
    "date": new Date("2015/07/02")
}, {
    "id": 674,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 4740,
    "date": new Date("2015/07/04")
}, {
    "id": 675,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 1455,
    "date": new Date("2015/07/04")
}, {
    "id": 676,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2070,
    "date": new Date("2015/07/01")
}, {
    "id": 677,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 970,
    "date": new Date("2015/07/11")
}, {
    "id": 678,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2810,
    "date": new Date("2015/07/12")
}, {
    "id": 679,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 8130,
    "date": new Date("2015/08/05")
}, {
    "id": 680,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 7700,
    "date": new Date("2015/08/19")
}, {
    "id": 681,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 4695,
    "date": new Date("2015/08/18")
}, {
    "id": 682,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 570,
    "date": new Date("2015/08/08")
}, {
    "id": 683,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 3060,
    "date": new Date("2015/08/25")
}, {
    "id": 684,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 1060,
    "date": new Date("2015/08/13")
}, {
    "id": 685,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 1755,
    "date": new Date("2015/08/12")
}, {
    "id": 686,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2070,
    "date": new Date("2015/08/24")
}, {
    "id": 687,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 6875,
    "date": new Date("2015/08/22")
}, {
    "id": 688,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 6375,
    "date": new Date("2015/08/07")
}, {
    "id": 689,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 720,
    "date": new Date("2015/08/01")
}, {
    "id": 690,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 3280,
    "date": new Date("2015/08/23")
}, {
    "id": 691,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 8820,
    "date": new Date("2015/08/16")
}, {
    "id": 692,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 5400,
    "date": new Date("2015/08/09")
}, {
    "id": 693,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 1500,
    "date": new Date("2015/08/14")
}, {
    "id": 694,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 1560,
    "date": new Date("2015/08/12")
}, {
    "id": 695,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 3975,
    "date": new Date("2015/08/14")
}, {
    "id": 696,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 580,
    "date": new Date("2015/08/24")
}, {
    "id": 697,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 2770,
    "date": new Date("2015/08/04")
}, {
    "id": 698,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 2070,
    "date": new Date("2015/08/18")
}, {
    "id": 699,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 5080,
    "date": new Date("2015/08/07")
}, {
    "id": 700,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 460,
    "date": new Date("2015/08/25")
}, {
    "id": 701,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 3580,
    "date": new Date("2015/08/26")
}, {
    "id": 702,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 1700,
    "date": new Date("2015/08/07")
}, {
    "id": 703,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 4200,
    "date": new Date("2015/09/23")
}, {
    "id": 704,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 4025,
    "date": new Date("2015/09/20")
}, {
    "id": 705,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 1845,
    "date": new Date("2015/09/04")
}, {
    "id": 706,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 4530,
    "date": new Date("2015/09/16")
}, {
    "id": 707,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 1570,
    "date": new Date("2015/09/20")
}, {
    "id": 708,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 6300,
    "date": new Date("2015/09/02")
}, {
    "id": 709,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 2340,
    "date": new Date("2015/09/02")
}, {
    "id": 710,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2340,
    "date": new Date("2015/09/08")
}, {
    "id": 711,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 6125,
    "date": new Date("2015/09/06")
}, {
    "id": 712,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 1650,
    "date": new Date("2015/09/05")
}, {
    "id": 713,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 4720,
    "date": new Date("2015/09/13")
}, {
    "id": 714,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 2820,
    "date": new Date("2015/09/18")
}, {
    "id": 715,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 5160,
    "date": new Date("2015/09/17")
}, {
    "id": 716,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 1470,
    "date": new Date("2015/09/18")
}, {
    "id": 717,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 5450,
    "date": new Date("2015/09/02")
}, {
    "id": 718,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 3120,
    "date": new Date("2015/09/14")
}, {
    "id": 719,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 4515,
    "date": new Date("2015/09/16")
}, {
    "id": 720,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 830,
    "date": new Date("2015/09/03")
}, {
    "id": 721,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 600,
    "date": new Date("2015/09/04")
}, {
    "id": 722,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 4275,
    "date": new Date("2015/09/18")
}, {
    "id": 723,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 435,
    "date": new Date("2015/09/10")
}, {
    "id": 724,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 4710,
    "date": new Date("2015/09/03")
}, {
    "id": 725,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 9000,
    "date": new Date("2015/10/03")
}, {
    "id": 726,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 7850,
    "date": new Date("2015/10/09")
}, {
    "id": 727,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 1155,
    "date": new Date("2015/10/09")
}, {
    "id": 728,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 3435,
    "date": new Date("2015/10/04")
}, {
    "id": 729,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 960,
    "date": new Date("2015/10/07")
}, {
    "id": 730,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 4220,
    "date": new Date("2015/10/21")
}, {
    "id": 731,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 1170,
    "date": new Date("2015/10/07")
}, {
    "id": 732,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2650,
    "date": new Date("2015/10/07")
}, {
    "id": 733,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 1300,
    "date": new Date("2015/10/05")
}, {
    "id": 734,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 1250,
    "date": new Date("2015/10/21")
}, {
    "id": 735,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 4640,
    "date": new Date("2015/10/09")
}, {
    "id": 736,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 1360,
    "date": new Date("2015/10/05")
}, {
    "id": 737,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 5670,
    "date": new Date("2015/10/17")
}, {
    "id": 738,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 7680,
    "date": new Date("2015/10/10")
}, {
    "id": 739,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 3550,
    "date": new Date("2015/10/10")
}, {
    "id": 740,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 1540,
    "date": new Date("2015/10/04")
}, {
    "id": 741,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 3165,
    "date": new Date("2015/10/23")
}, {
    "id": 742,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 1480,
    "date": new Date("2015/10/19")
}, {
    "id": 743,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 1800,
    "date": new Date("2015/10/02")
}, {
    "id": 744,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1940,
    "date": new Date("2015/10/01")
}, {
    "id": 745,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 2445,
    "date": new Date("2015/10/11")
}, {
    "id": 746,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 3285,
    "date": new Date("2015/10/17")
}, {
    "id": 747,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 1320,
    "date": new Date("2015/11/23")
}, {
    "id": 748,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 2750,
    "date": new Date("2015/11/04")
}, {
    "id": 749,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 3120,
    "date": new Date("2015/11/07")
}, {
    "id": 750,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 4275,
    "date": new Date("2015/11/05")
}, {
    "id": 751,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 1250,
    "date": new Date("2015/11/15")
}, {
    "id": 752,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 2400,
    "date": new Date("2015/11/20")
}, {
    "id": 753,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 4590,
    "date": new Date("2015/11/08")
}, {
    "id": 754,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 1990,
    "date": new Date("2015/11/15")
}, {
    "id": 755,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 6125,
    "date": new Date("2015/11/14")
}, {
    "id": 756,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 2750,
    "date": new Date("2015/11/25")
}, {
    "id": 757,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 5940,
    "date": new Date("2015/11/03")
}, {
    "id": 758,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 1220,
    "date": new Date("2015/11/01")
}, {
    "id": 759,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 6150,
    "date": new Date("2015/11/07")
}, {
    "id": 760,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 5340,
    "date": new Date("2015/11/15")
}, {
    "id": 761,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 3950,
    "date": new Date("2015/11/15")
}, {
    "id": 762,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 3860,
    "date": new Date("2015/11/17")
}, {
    "id": 763,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 3840,
    "date": new Date("2015/11/24")
}, {
    "id": 764,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2600,
    "date": new Date("2015/11/24")
}, {
    "id": 765,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 1140,
    "date": new Date("2015/11/17")
}, {
    "id": 766,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 1170,
    "date": new Date("2015/11/20")
}, {
    "id": 767,
    "region": "North America",
    "country": "USA",
    "city": "New York",
    "amount": 9180,
    "date": new Date("2015/12/02")
}, {
    "id": 768,
    "region": "North America",
    "country": "USA",
    "city": "Los Angeles",
    "amount": 4825,
    "date": new Date("2015/12/15")
}, {
    "id": 769,
    "region": "North America",
    "country": "USA",
    "city": "Denver",
    "amount": 2265,
    "date": new Date("2015/12/17")
}, {
    "id": 770,
    "region": "North America",
    "country": "CAN",
    "city": "Vancouver",
    "amount": 4515,
    "date": new Date("2015/12/25")
}, {
    "id": 771,
    "region": "North America",
    "country": "CAN",
    "city": "Edmonton",
    "amount": 370,
    "date": new Date("2015/12/13")
}, {
    "id": 772,
    "region": "South America",
    "country": "BRA",
    "city": "Rio de Janeiro",
    "amount": 6020,
    "date": new Date("2015/12/23")
}, {
    "id": 773,
    "region": "South America",
    "country": "ARG",
    "city": "Buenos Aires",
    "amount": 690,
    "date": new Date("2015/12/11")
}, {
    "id": 774,
    "region": "South America",
    "country": "PRY",
    "city": "Asuncion",
    "amount": 2910,
    "date": new Date("2015/12/02")
}, {
    "id": 775,
    "region": "Europe",
    "country": "GBR",
    "city": "London",
    "amount": 5200,
    "date": new Date("2015/12/18")
}, {
    "id": 776,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 2525,
    "date": new Date("2015/12/06")
}, {
    "id": 777,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 4700,
    "date": new Date("2015/12/18")
}, {
    "id": 778,
    "region": "Europe",
    "country": "RUS",
    "city": "Moscow",
    "amount": 2700,
    "date": new Date("2015/12/17")
}, {
    "id": 779,
    "region": "Asia",
    "country": "CHN",
    "city": "Beijing",
    "amount": 8580,
    "date": new Date("2015/12/22")
}, {
    "id": 780,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 4320,
    "date": new Date("2015/12/26")
}, {
    "id": 781,
    "region": "Asia",
    "country": "KOR",
    "city": "Seoul",
    "amount": 2475,
    "date": new Date("2015/12/16")
}, {
    "id": 782,
    "region": "Australia",
    "country": "AUS",
    "city": "Sydney",
    "amount": 3500,
    "date": new Date("2015/12/10")
}, {
    "id": 783,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 2955,
    "date": new Date("2015/12/24")
}, {
    "id": 784,
    "region": "Africa",
    "country": "ZAF",
    "city": "Pretoria",
    "amount": 2160,
    "date": new Date("2015/12/13")
}, {
    "id": 785,
    "region": "Africa",
    "country": "EGY",
    "city": "Cairo",
    "amount": 6670,
    "date": new Date("2015/12/04")
}, {
    "id": 786,
    "region": "Australia",
    "country": "AUS",
    "city": "Melbourne",
    "amount": 4455,
    "date": new Date("2015/12/26")
}, {
    "id": 787,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 1075,
    "date": new Date("2015/12/17")
}, {
    "id": 788,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 2520,
    "date": new Date("2015/12/08")
}, {
    "id": 789,
    "region": "Europe",
    "country": "ESP",
    "city": "Madrid",
    "amount": 4340,
    "date": new Date("2015/12/15")
}, {
    "id": 790,
    "region": "Europe",
    "country": "DEU",
    "city": "Berlin",
    "amount": 3350,
    "date": new Date("2015/12/01")
}, {
    "id": 791,
    "region": "Asia",
    "country": "JPN",
    "city": "Tokio",
    "amount": 7320,
    "date": new Date("2015/12/16")
}];

@Injectable()
export class Service {
    getSales() {
        return sales;
    }
}
