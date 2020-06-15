import * as partnerRequestLogRepo from './partner_request_log.repository'

export const createPartnerRequestLog = async (partnerCode, params, query, headers, body) => {
  return await partnerRequestLogRepo.createPartnerRequestLog(partnerCode, params, query, headers, body)
}
