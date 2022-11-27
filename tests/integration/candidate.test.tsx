import { moduleHosts } from '../../src/utils/config'
import request from 'supertest'
import app from '../../src/app'

const ELECTION_COMMITTEE_HOST = moduleHosts.electionCommittee

describe('Test ec /candidates', () => {})

describe('Test ec /candidates/area/{areaId}', () => {})

describe('Test ec /candidates/{id}', () => {})

describe('Test ec /party', () => {})

describe('Test ec /party/{partyId}', () => {})

describe('Test ec /party/member/{partyId}', () => {})

describe('Test ec /vote', () => {})

describe('Test ec /validation', () => {})