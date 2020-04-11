export const GENDERS = [
    {id: 0, name: 'resources.gender.male'},
    {id: 1, name: 'resources.gender.female'},
    {id: 2, name: 'resources.gender.other'}
];

export const GENDERS_STRING = [
    {id: 'MALE', name: 'resources.gender.male'},
    {id: 'FEMALE', name: 'resources.gender.female'},
    {id: 'OTHER', name: 'resources.gender.other'}
];

export const TITLES = [
    { id: 'MR', name: 'resources.title.mr' },
    { id: 'MRS', name: 'resources.title.mrs' },
    { id: 'MS', name: 'resources.title.ms' },
    { id: 'MISS', name: 'resources.title.miss' }
];

export const ACTIVES = [
    {id: 1, name: 'commons.yes'},
    {id: 0, name: 'commons.no'}
]

export const ORDER_STATUS = [
    {id: 0, name: 'resources.orders.status.notScheduled'},
    {id: 1, name: 'resources.orders.status.scheduled'},
    {id: 2, name: 'resources.orders.status.inProgress'},
    {id: 3, name: 'resources.orders.status.completed'}
];

export const IDENTIFIER_NID = 'NID';
export const IDENTIFIER_EMAIL = 'EMAIL';
export const IDENTIFIER_PHONE = 'MOBILE';
export const IDENTIFIER_PASSPORT = 'PASSPORT';
export const IDENTIFIER_TYPES = [
    {id: IDENTIFIER_NID, name: `resources.identifiers.${IDENTIFIER_NID}`},
    {id: IDENTIFIER_EMAIL, name: `resources.identifiers.${IDENTIFIER_EMAIL}`},
    {id: IDENTIFIER_PHONE, name: `resources.identifiers.${IDENTIFIER_PHONE}`},
    {id: IDENTIFIER_PASSPORT, name: `resources.identifiers.${IDENTIFIER_PASSPORT}`}
];

export const ADDRESSES_ADDRESS = 'ADDRESS';
export const ADDRESSES_DISTRICT = 'DISTRICT';
export const ADDRESSES_CITY = 'CITY';
export const ADDRESSES_COUNTRY = 'COUNTRY';
export const ADDRESSES_TYPES = [
    {id: ADDRESSES_ADDRESS, name: `resources.addresses.${ADDRESSES_ADDRESS}`},
    {id: ADDRESSES_DISTRICT, name: `resources.addresses.${ADDRESSES_DISTRICT}`},
    {id: ADDRESSES_CITY, name: `resources.addresses.${ADDRESSES_CITY}`},
    {id: ADDRESSES_COUNTRY, name: `resources.addresses.${ADDRESSES_COUNTRY}`}
];
export const IDENTIFIER_TYPES_MIN = [IDENTIFIER_TYPES[0], IDENTIFIER_TYPES[3]];
export const CONTRAST_MEDIA = [{id: true, name: "commons.yes"}, {id: false, name: "commons.no"}];
export const UrgentType = [{"id": 'Urgent', "name": 'Urgent'}, {"id": 'Routine', 'name': 'Routine'}];
export const RENTAL_STATUS = ['resources.rentals.status.inactive', 'resources.rentals.status.active'];

export const SCOPES_CHOICES = [
    { id: 'query', name: 'query' },
    { id: 'create', name: 'create' },
    { id: 'update', name: 'update' },
    { id: 'delete', name: 'delete' },
    { id: 'trust', name: 'trust' }
];

export const AUTHORIZED_GRANT_TYPES_CHOICES = [
    { id: 'password', name: 'password' },
    { id: 'authorization_code', name: 'authorization_code' },
    { id: 'client_credentials', name: 'client_credentials' },
    { id: 'refresh_token', name: 'refresh_token' }
];

export const STORAGES = [
    {id: 'storage_1', name: 'Kho 1'},
    {id: 'storage_2', name: 'Kho 2'}
]

export const LOAI_XE = [
    {id: 'xe_banh_xich', name: 'Xe bánh xích'},
    {id: 'vat_tu_xe_banh_xich', name: 'Vật tư xe bánh xích'}
]

export const LENH_NHAP_XUAT = [
    {id: 'lẹnh_nhap', name: 'Lệnh nhập'},
    {id: 'lenh_xuat', name: 'Lệnh xuất'}
]
