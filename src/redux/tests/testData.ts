import { IUserData } from '../../interfaces/data';

export const mockUsers: Record<string, any>[] = [
    {
        "id": 1, 
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": { 
                "street": "Kulas Light",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874",
                "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
                "name": "Romaguera-Crona",
        },
    },
    {
        "id": 2, 
        "name": "Abraham Lincoln",
        "username": "abracadabra",
        "email": "abraham@potus.com",
        "address": { 
                "street": "USA",
                "suite": "President Suite",
                "city": "Ohio",
                "zipcode": "92998-3874",
                "geo": {
                    "lat": "-37.3159",
                    "lng": "81.1496"
                }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "potus.com",
        "company": {
            "name": "USA",
        },
    }
];

export const mockSingleUserData: IUserData = {
    name: 'Abraham Lincoln',
    username: 'abracadabra',
    email: 'abraham@potus.com',
    address: { 
        street: 'USA',
        suite: 'President Suite',
        city: 'Ohio',
        zipcode: '92998-3874',
        geo: {
            lat: '-37.3159',
            lng: '81.1496'
        }
    },
    phone: '1-770-736-8031 x56442',
    website: 'potus.com',
    company: {
        'name': 'USA',
    },
};