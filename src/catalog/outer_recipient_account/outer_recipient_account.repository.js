import Models from '../../../models/all'
import {PARTNER_BANK_NAMES} from '../../constants'

export const findAllOuterRecipientAccountsOfUserInPGPPartner = async (userId, raw = true) => {
  return await Models.OuterRecipientAccounts.findAll({
    where: {userId, bankName: PARTNER_BANK_NAMES.PGP, isDeleted: false},
    raw
  })
}

export const findAllOuterRecipientAccountsOfUserInRSAPartner = async (userId, raw = true) => {
  return await Models.OuterRecipientAccounts.findAll({
    where: {userId, bankName: PARTNER_BANK_NAMES.RSA, isDeleted: false},
    raw
  })
}

export const findOuterRecipientAccountById = async (recId, raw = true) => {
  return await Models.OuterRecipientAccounts.findOne({where: {id: recId, isDeleted: false}, raw})
}

export const findOuterRecipientAccountOfUserByAccountId = async (userId, accountId, raw = true) => {
  return await Models.OuterRecipientAccounts.findOne({where: {userId, accountId, isDeleted: false}, raw})
}

export const createOuterRecipientAccount = async (userId, accountId, bankName, nickname) => {
  return await Models.OuterRecipientAccounts.create({userId, accountId, bankName, nickname})
}

export const updateOuterRecipientAccountById = async (recId, accountId, bankName, nickname, returning = true) => {
  return await Models.OuterRecipientAccounts.update(
    {accountId, bankName, nickname},
    {where: {id: recId, isDeleted: false}, returning}
  )
}

export const deleteOuterRecipientAccountById = async (recId, returning = true) => {
  return await Models.OuterRecipientAccounts.update(
    {isDeleted: true},
    {where: {id: recId, isDeleted: false}, returning}
  )
}
