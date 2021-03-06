export const commons = {
    yes: "Yes",
        no: "No",
        and: "and",
        message: {
            delete: 'Do you really want to delete this %{resourceName}?',
            save: 'Do you really want to add this %{resourceName}?',
            edit: 'Do you really want to edit this %{resourceName}?',
            noChange: 'You not change data yet!',
            error: '%{error}',
            invalid: {
                required: {
                    pid: 'Patient ID is required',
                    patientName: 'Patient name is required',
                    birthDate: 'Date of birth is required with format dd-MM-YYYY',
                    gender: 'Gender is required',
                    accessionNumber: 'Accession number is required',

                    nameCenter: 'Center name is required',
                    idCenter: 'Center ID is required',
                    idTypeCenter: 'Center Type ID is required',
                    nameTypeCenter: 'Center type name is required',
                    typeCenter: 'Center type is required',
                    idRelationType: 'Relation type ID is required',
                    nameRelationType: 'Relation name ID is required',
                    idRelationCenter: 'Relation center ID is required',
                    nameRelationCenter:'Relation center name is required',
                    startDate: 'Start date is required',
                    active: 'Active is required',

                    orderId: 'Order ID is required',
                    orderDate: 'Order date is required',
                    diagnosis: 'Diagnosis is required',
                    department: 'Department is required',
                    referringPhysician: 'Referring physician is required',
                    modalityType: 'Modality type is required',
                    contrastMedia: 'Using contrast media information is required',
                    priority: 'Priority is required',
                    status: 'Status is required',
                    protocol: 'Protocol is required',
                    bodyPart: 'Body part is required',

                    username: 'Username is required',
                    password: 'Password is required',
                    passwordVerify: 'Verified password is required',
                    phone: 'Phone is required',
                    email: 'Email is required',
                    degree: 'Degree is required',

                    templateName: 'Template name is required',
                    authority: 'Authority is required',
                    authorityId: 'Authority ID is required',
                    roleId: 'Role ID is required',
                    roleName: 'Role name is required',
                    clientAuthorityId: 'Client Authority ID is required',
                    clientAuthorityName: "Client Authority name is required",
                    resourceId: 'Resource ID is required',
                    resourceName: 'Resource name is required',
                    scopeId: 'Scope ID is required',
                    scopeName: 'Scope name is required',
                    clientId: 'Client ID is required',
                    clientName: 'Client name is required',
                    secret: 'Secret key is required',
                    authorizedGrantTypes: 'AuthorizedGrantTypes is required'
                },
                update: {
                    notChange: 'You not yet change data!'
                },
                pid: 'Patient Id must have at least 3 characters, including only letters and digits',
                patientName: 'Patient Name must have at least 3 characters, including only letters and digits, not including special characters',
                accessionNumber: 'Accession Number must have at least 3 characters, including only letters and digits, not including special characters',
                nationalId: 'National Id are 9-12 characters, including only letters and digits, not including special characters',
                phoneNumber: 'Phone Number are 9-12 characters, including only numbers',
                brand: 'Brand Name must have at least 3 characters, including only letters and digits',
                birthDate: 'Year must be equal or greater than 1900',

                cid: 'Center Id must have at least 3 characters, including only letters and digits',
                ctypeid: 'Center Type Id must have at least 3 characters, including only letters and digits',
                
                // username: 'Username must not be longer than 50 characters, including only letters and digits. Please try again.',
                password: 'Passwords must be 8 characters long, including uppercase letters, lowercase letters, and at least one digit. Please try again.',
                passwordVerify: 'Verified password does not match with password. Please try again.',
                phone: 'Phone number must include number only',
                email: 'Email format is not valid',
                secretVerify: 'Verified secret does not match with secret. Please try again.',
                accessTokenValiditySeconds: 'Access Token Validity Seconds ís required a number',
                refreshTokenValiditySeconds: 'Refresh Token Validity Seconds is required a number',
                fullName: 'Full name at least 3 characters, including only letters and digits',
                city: 'City at least 3 characters, including only letters and digits',
                username: 'Username have at least 3 and max is 50 characters, including only letters and digits. Please try again',
                registeredRedirectURIs: 'URL path format is wrong.'
            }
        },
        cannotDeleteResource: 'Can\'t delete resource %{id} because it being used!!!',
        cannotCreateUser: 'Cann\'t create new user! Please try again or contact to Adminstractor.',
        cannotCreatePerson: 'Cann\'t create new person! Please try again or contact to Adminstractor.',
        cannotCreateAvatar: 'Cann\'t create new avatar! Please try again or contact to Adminstractor'
}