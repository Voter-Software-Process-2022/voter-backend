import { moduleHosts } from '../../src/utils/config'
import request from 'supertest'
import app from '../../src/app'
import exp from 'constants'

const ELECTION_COMMITTEE_HOST = moduleHosts.electionCommittee

const validAreaId = 1

const validCandidatesId = 44

const validPartyId = 1

describe('Test ec /candidates', () => {
    it('GET / => get all candidates info', async () => {
        const res = await request(`${ELECTION_COMMITTEE_HOST}`).get('/candidates')
        expect(res.status).toBe(200)
        expect(res.error).toBe(false)
        expect(res.body).not.toBeNull()
        for (let i=0; i<res.body.length; i++) {
            const indexCandidate = res.body[i]
            expect(indexCandidate.id).not.toBeNull()
            expect(indexCandidate.name).not.toBeNull()
            expect(indexCandidate.pictureUrl).not.toBeNull()
            expect(indexCandidate.area_id).not.toBeNull()
            expect(indexCandidate.party_id).not.toBeNull()
        }
      });
})

describe('Test ec /candidates/area/{areaId}', () => {
    it('GET / => get candidates info in valid area', async () => {
        const res = await request(`${ELECTION_COMMITTEE_HOST}`).get(`/candidates/area/${validAreaId}`)
        expect(res.status).toBe(200)
        expect(res.error).toBe(false)
        expect(res.body).not.toBeNull()
        for (let i=0; i<res.body.length; i++) {
            const indexCandidate = res.body[i]
            expect(indexCandidate.id).not.toBeNull()
            expect(indexCandidate.name).not.toBeNull()
            expect(indexCandidate.pictureUrl).not.toBeNull()
            expect(indexCandidate.area_id).not.toBeNull()
            expect(indexCandidate.party_id).not.toBeNull()

            expect(indexCandidate.area_id).toBe(validAreaId)
        }
      });

    it('GET / => get candidates info in invalid area', async () => {
        const res = await request(`${ELECTION_COMMITTEE_HOST}`).get(`/candidates/area/9`)
        expect(res.status).toBe(200)
        expect(res.error).toBe(false)
        expect(res.body).not.toBeNull()
        expect(res.body.length).toBe(0)
      });

    it('GET / => get candidates info in invalid area (char)', async () => {
        const invalidAreaIdChar = 'a'
        const res = await request(`${ELECTION_COMMITTEE_HOST}`).get(`/candidates/area/${invalidAreaIdChar}`)
        expect(res.status).toBe(422)
      });
})

describe('Test ec /candidates/{id}', () => {
    it('GET / => get candidates info in valid candidate', async () => {
        const res = await request(`${ELECTION_COMMITTEE_HOST}`).get(`/candidates/${validCandidatesId}`)
        expect(res.status).toBe(200)
        expect(res.error).toBe(false)
        expect(res.body).not.toBeNull()
        expect(res.body.id).not.toBeNull()
        expect(res.body.name).not.toBeNull()
        expect(res.body.pictureUrl).not.toBeNull()
        expect(res.body.area_id).not.toBeNull()            
        expect(res.body.party_id).not.toBeNull()

        expect(res.body.area_id).toBe(validAreaId)    
      });

    it('GET / => get candidates info in invalid area', async () => {
        const res = await request(`${ELECTION_COMMITTEE_HOST}`).get(`/candidates/1`)
        expect(res.status).toBe(404)
        expect(res.body).not.toBeNull()
        expect(res.body).toEqual(
            expect.objectContaining({
                detail: "Candidate not found"
            })
          )
      });

    it('GET / => get candidates info in invalid area (char)', async () => {
        const invalidCandidateIdChar = 'a'
        const res = await request(`${ELECTION_COMMITTEE_HOST}`).get(`/candidates/${invalidCandidateIdChar}`)
        expect(res.status).toBe(422)
      });
})

describe('Test ec /party', () => {
    it('GET / => get all party info', async () => {
        const res = await request(`${ELECTION_COMMITTEE_HOST}`).get('/party')
        expect(res.status).toBe(200)
        expect(res.error).toBe(false)
        expect(res.body).not.toBeNull()
        for (let i=0; i<res.body.length; i++) {
            const indexParty = res.body[i]
            expect(indexParty.id).not.toBeNull()
            expect(indexParty.name).not.toBeNull()
            expect(indexParty.pictureUrl).not.toBeNull()
        }
      });
})

describe('Test ec /party/{partyId}', () => {
    it('GET / => get party info in valid party', async () => {
        const res = await request(`${ELECTION_COMMITTEE_HOST}`).get(`/party/${validPartyId}`)
        expect(res.status).toBe(200)
        expect(res.error).toBe(false)
        expect(res.body).not.toBeNull()
        expect(res.body.id).not.toBeNull()
        expect(res.body.name).not.toBeNull()
        expect(res.body.pictureUrl).not.toBeNull()

        expect(res.body.id).toBe(validPartyId)    
      });

    it('GET / => get party info in invalid party', async () => {
        const res = await request(`${ELECTION_COMMITTEE_HOST}`).get(`/party/3`)
        expect(res.status).toBe(200)
        expect(res.body).toBeNull()
      });

    it('GET / => get party info in invalid party (char)', async () => {
        const invalidPartyIdChar = 'a'
        const res = await request(`${ELECTION_COMMITTEE_HOST}`).get(`/party/${invalidPartyIdChar}`)
        expect(res.status).toBe(422)
      });
})

describe('Test ec /party/member/{partyId}', () => {
    it('GET / => get all member info in party', async () => {
        const res = await request(`${ELECTION_COMMITTEE_HOST}`).get(`/party/member/${validCandidatesId}`)
        expect(res.status).toBe(200)
        expect(res.error).toBe(false)
        expect(res.body).not.toBeNull()
        for (let i=0; i<res.body.length; i++) {
            const indexCandidate = res.body[i]
            expect(indexCandidate.id).not.toBeNull()
            expect(indexCandidate.name).not.toBeNull()
            expect(indexCandidate.pictureUrl).not.toBeNull()
            expect(indexCandidate.area_id).not.toBeNull()
            expect(indexCandidate.party_id).not.toBeNull()

            expect(indexCandidate.party_id).toBe(validCandidatesId)
        }
      });
})

describe('Test ec /vote', () => {

})

describe('Test ec /validation', () => {

})