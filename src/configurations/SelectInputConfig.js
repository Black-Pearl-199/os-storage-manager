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

export const BODY_PARTS = [
    {
        id: "SKULL",
        name: "SKULL"
    },
    {
        id: " CSPINE",
        name: " CSPINE"
    },
    {
        id: "TSPINE",
        name: "TSPINE"
    },
    {
        id: "LSPINE",
        name: "LSPINE"
    },
    {
        id: "SSPINE",
        name: "SSPINE"
    },
    {
        id: "COCCYX",
        name: "COCCYX"
    },
    {
        id: "CHEST",
        name: "CHEST"
    },
    {
        id: "CLAVICLE",
        name: "CLAVICLE"
    },
    {
        id: "BREAST",
        name: "BREAST"
    },
    {
        id: "ABDOMEN",
        name: "ABDOMEN"
    },
    {
        id: "PELVIS",
        name: "PELVIS"
    },
    {
        id: "HIP",
        name: "HIP"
    },
    {
        id: "SHOULDER",
        name: "SHOULDER"
    },
    {
        id: "ELBOW",
        name: "ELBOW"
    },
    {
        id: "KNEE",
        name: "KNEE"
    },
    {
        id: "ANKLE",
        name: "ANKLE"
    },
    {
        id: "HAND",
        name: "HAND"
    },
    {
        id: "FOOT",
        name: "FOOT"
    },
    {
        id: "EXTREMITY",
        name: "EXTREMITY"
    },
    {
        id: "HEAD",
        name: "HEAD"
    },
    {
        id: "HEART",
        name: "HEART"
    },
    {
        id: "NECK",
        name: "NECK"
    },
    {
        id: "LEG",
        name: "LEG"
    },
    {
        id: "ARM",
        name: "ARM"
    },
    {
        id: "JAW",
        name: "JAW"
    }
];

export const MODALITY_TYPE_OPTIONS = [
    {
        id: "AR",
        name: "Autorefraction"
    },
    {
        id: "ASMT",
        name: "Content Assessment Results"
    },
    {
        id: "AU",
        name: "Audio"
    },
    {
        id: "BDUS",
        name: "Bone Densitometry (ultrasound)"
    },
    {
        id: "BI",
        name: "Biomagnetic imaging"
    },
    {
        id: "BMD",
        name: "Bone Densitometry (X-Ray)"
    },
    {
        id: "CR",
        name: "Computed Radiography"
    },
    {
        id: "CT",
        name: "Computed Tomography"
    },
    {
        id: "DG",
        name: "Diaphanography"
    },
    {
        id: "DOC",
        name: "Document"
    },
    {
        id: "DX",
        name: "Digital Radiography"
    },
    {
        id: "ECG",
        name: "Electrocardiography"
    },
    {
        id: "EPS",
        name: "Cardiac Electrophysiology"
    },
    {
        id: "ES",
        name: "Endoscopy"
    },
    {
        id: "FID",
        name: "Fiducials"
    },
    {
        id: "GM",
        name: "General Microscopy"
    },
    {
        id: "HC",
        name: "Hard Copy"
    },
    {
        id: "HD",
        name: "Hemodynamic Waveform"
    },
    {
        id: "IO",
        name: "Intra-Oral Radiography"
    },
    {
        id: "IOL",
        name: "Intraocular Lens Data"
    },
    {
        id: "IVOCT",
        name: "Intravascular Optical Coherence Tomography"
    },
    {
        id: "IVUS",
        name: "Intravascular Ultrasound"
    },
    {
        id: "KER",
        name: "Keratometry"
    },
    {
        id: "KO",
        name: "Key Object Selection"
    },
    {
        id: "LEN",
        name: "Lensometry"
    },
    {
        id: "LS",
        name: "Laser surface scan"
    },
    {
        id: "MG",
        name: "Mammography"
    },
    {
        id: "MR",
        name: "Magnetic Resonance"
    },
    {
        id: "NM",
        name: "Nuclear Medicine"
    },
    {
        id: "OAM",
        name: "Ophthalmic Axial Measurements"
    },
    {
        id: "OCT",
        name: "Optical Coherence Tomography (non-Ophthalmic)"
    },
    {
        id: "OP",
        name: "Ophthalmic Photography"
    },
    {
        id: "OPM",
        name: "Ophthalmic Mapping"
    },
    {
        id: "OPT",
        name: "Ophthalmic Tomography"
    },
    {
        id: "OPV",
        name: "Ophthalmic Visual Field"
    },
    {
        id: "OSS",
        name: "Optical Surface Scan"
    },
    {
        id: "OT",
        name: "Other"
    },
    {
        id: "PLAN",
        name: "Plan"
    },
    {
        id: "PR",
        name: "Presentation State"
    },
    {
        id: "PT",
        name: "Positron emission tomography (PET)"
    },
    {
        id: "PX",
        name: "Panoramic X-Ray"
    },
    {
        id: "REG",
        name: "Registration"
    },
    {
        id: "RESP",
        name: "Respiratory Waveform"
    },
    {
        id: "RF",
        name: "Radio Fluoroscopy"
    },
    {
        id: "RG",
        name: "Radiographic imaging (conventional film/screen)"
    },
    {
        id: "RTDOSE",
        name: "Radiotherapy Dose"
    },
    {
        id: "RTIMAGE",
        name: "Radiotherapy Image"
    },
    {
        id: "RTPLAN",
        name: "Radiotherapy Plan"
    },
    {
        id: "RTRECORD",
        name: "RT Treatment Record"
    },
    {
        id: "RTSTRUCT",
        name: "Radiotherapy Structure Set"
    },
    {
        id: "RWV",
        name: "Real World value Map"
    },
    {
        id: "SEG",
        name: "Segmentation"
    },
    {
        id: "SM",
        name: "Slide Microscopy"
    },
    {
        id: "SMR",
        name: "Stereometric Relationship"
    },
    {
        id: "SR",
        name: "SR Document"
    },
    {
        id: "SRF",
        name: "Subjective Refraction"
    },
    {
        id: "STAIN",
        name: "Automated Slide Stainer"
    },
    {
        id: "TG",
        name: "Thermography"
    },
    {
        id: "US",
        name: "Ultrasound"
    },
    {
        id: "VA",
        name: "Visual Acuity"
    },
    {
        id: "XA",
        name: "X-Ray Angiography"
    },
    {
        id: "XC",
        name: "External-camera Photography"
    }
];

export const REPORTED = [
    {id: 0, name: "commons.yes"},
    {id: 1, name: "commons.no"}
];

export const PRIORITY_CHOICES = [
    {id: 1, name: 'priority.1'},
    {id: 2, name: 'priority.2'},
    {id: 3, name: 'priority.3'},
    {id: 4, name: 'priority.4'},
    {id: 5, name: 'priority.5'},
];
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
