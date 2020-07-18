import Models from '../../../models/all'

export const createPartnerRequestLog = async (partnerCode, params, query, headers, body) => {
  return await Models.PartnerRequestLogs.create({
    partnerCode,
    params: JSON.stringify(params),
    query: JSON.stringify(query),
    headers: JSON.stringify(headers),
    body: JSON.stringify(body)
  })
}
