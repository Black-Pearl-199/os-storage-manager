import {required} from "ra-core";
import {
    msgPrefix,
    testBirthDate,
    testEmail,
    testOrderId,
    testPasswordVerify,
    testPatientName,
    testPatternPassword,
    testPatternUsername,
    testPhoneNumber,
    testPid,testEmailNull,
    testCid, testCTypeid, testPatternPasswordNotRequired,
    testSoGiaHang,
    testSoTang,
    testSoO
} from "./inputValidate";

const msgPrefixRequired = `${msgPrefix}.required`;
export const validatePid = [required(`${msgPrefixRequired}.pid`), testPid];
export const validatePatientName = [required(`${msgPrefixRequired}.patientName`), testPatientName];
export const validateBirthDate = [required(`${msgPrefixRequired}.birthDate`), testBirthDate()];
export const validateGender = [required(`${msgPrefixRequired}.gender`)];

export const validateNameCenter = [required(`${msgPrefixRequired}.nameCenter`)];
export const validateIdCenter = [required(`${msgPrefixRequired}.idCenter`), testCid];
export const validateIdTypeCenter = [required(`${msgPrefixRequired}.idTypeCenter`), testCTypeid];
export const validateNameTypeCenter = [required(`${msgPrefixRequired}.nameTypeCenter`)];
export const validateTypeCenter = [required(`${msgPrefixRequired}.typeCenter`)];
export const validateIdRelationType = [required(`${msgPrefixRequired}.idRelationType`)];
export const validateNameRelationType= [required(`${msgPrefixRequired}.nameRelationType`)];

export const validateOrderId = [required(`${msgPrefixRequired}.orderId`), testOrderId];
export const validateOrderDate = [required(`${msgPrefixRequired}.orderDate`)];
export const validateDiagnosis = [required(`${msgPrefixRequired}.diagnosis`)];
export const validateDepartment = [required(`${msgPrefixRequired}.department`)];
export const validateReferringPhysician = [required(`${msgPrefixRequired}.referringPhysician`)];
export const validateModalityType = [required(`${msgPrefixRequired}.modalityType`)];
export const validateContrastMedia = [required(`${msgPrefixRequired}.contrastMedia`)];
export const validatePriority = [required(`${msgPrefixRequired}.priority`)];
export const validateStatus = [required(`${msgPrefixRequired}.status`)];
export const validateProtocol = [required(`${msgPrefixRequired}.protocol`)];
export const validateBodyPart = [required(`${msgPrefixRequired}.bodyPart`)];

export const validateUsername = [required(`${msgPrefixRequired}.username`), testPatternUsername];
export const validatePassword = [required(`${msgPrefixRequired}.password`), testPatternPassword];
export const validateNewPassword = [testPatternPassword];
export const validatePasswordVerify = [testPasswordVerify('password')];

export const validateFullName = [required(`${msgPrefixRequired}.fullName`)];
export const validatePhoneNumber = [required(`${msgPrefixRequired}.phone`), testPhoneNumber];
export const validateEmail = [required(`${msgPrefixRequired}.email`), testEmail];

export const validateAistoB = [required(`${msgPrefixRequired}.aistob`)];
export const validateBistoA = [required(`${msgPrefixRequired}.bistoa`)];
export const validatePersonA = [required(`${msgPrefixRequired}.personA`)];
export const validatePersonB = [required(`${msgPrefixRequired}.personB`)];

export const validateTemplateName = [required(`${msgPrefixRequired}.templateName`)];
export const validateAuthority = [required(`${msgPrefixRequired}.authority`)];
export const validateAuthorityId = [required(`${msgPrefixRequired}.authorityId`)];
export const validateRoleId = [required(`${msgPrefixRequired}.roleId`)];
export const validateRoleName = [required(`${msgPrefixRequired}.roleName`)];
export const validateCLientAuthority = [required(`${msgPrefixRequired}.authority`)];
export const validateClientAuthorityId = [required(`${msgPrefixRequired}.authorityId`)];
export const validateResourceId = [required(`${msgPrefixRequired}.resourceId`)];
export const validateResourceName = [required(`${msgPrefixRequired}.resourceName`)];
export const validateScopeId = [required(`${msgPrefixRequired}.scopeId`)];
export const validateScopeName = [required(`${msgPrefixRequired}.scopeName`)];
export const validateClientId = [required(`${msgPrefixRequired}.clientId`)];
export const validateClientName = [required(`${msgPrefixRequired}.clientName`)];
export const validateSecret = [required(`${msgPrefixRequired}.secret`)];
export const validateSecretNotRequired = testPatternPasswordNotRequired;
export const validateSecretVerify = [testPasswordVerify('secret')];
export const validateAuthorizedGrantTypes = [required(`${msgPrefixRequired}.authorizedGrantTypes`)];

export const validateTestEmail = testEmailNull;
export const validateStartDate = [required(`${msgPrefixRequired}.startDate`)];
export const validateActive = [required(`${msgPrefixRequired}.active`)];

export const validateTenKho = [required(`${msgPrefixRequired}.ten_kho`)];
export const validateSoGiaHang = [required(`${msgPrefixRequired}.so_gia_hang`), testSoGiaHang];
export const validateSoTang = [required(`${msgPrefixRequired}.so_tang`), testSoTang];
export const validateSoO = [required(`${msgPrefixRequired}.so_o`), testSoO];

export const validateTenPhanLoai = [required(`${msgPrefixRequired}.ten_phan_loai`)];

export * from './inputValidate';