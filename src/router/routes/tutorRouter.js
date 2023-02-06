import { lazy } from 'react'
import { Route } from 'react-router-dom'

const TutorHome = lazy(() => import('~/pages/tutor-home/TutorHome'))

export const tutorRouter = <Route element={ <TutorHome /> } index />
