import { Route, Routes } from 'react-router-dom'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import { ModeProvider, useMode } from '@/context/ModeContext'
import { SectionRegistryProvider } from '@/context/SectionRegistry'
import { DoorTransitionProvider } from '@/context/DoorTransition'
import { PortfolioPage } from '@/routes/PortfolioPage'
import { NotFound } from '@/routes/NotFound'

/**
 * Three route entries, ONE element.
 *
 * If these ever become different components per path, the whole architecture
 * inverts: content stops being always-in-the-DOM, the page stops scrolling past
 * the doors, and Ctrl+F stops finding things. Add paths here, never elements.
 */
function Shell() {
  const { motionOff } = useMode()

  return (
    // Layer 2 of the motion kill switch. One prop disables every Motion
    // animation in the tree; layer 1 is styles/motion.css, layer 3 is the
    // components that simply do not render when motion is off.
    <MotionConfig reducedMotion={motionOff ? 'always' : 'user'}>
      <SectionRegistryProvider>
        <DoorTransitionProvider>
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/:sectionId" element={<PortfolioPage />} />
            <Route path="/:sectionId/:itemSlug" element={<PortfolioPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DoorTransitionProvider>
      </SectionRegistryProvider>
    </MotionConfig>
  )
}

export default function App() {
  return (
    <ModeProvider>
      {/* domAnimation instead of the full feature bundle — ~18KB gz vs ~34KB.
          Nothing here needs drag or layout projection. */}
      <LazyMotion features={domAnimation} strict>
        <Shell />
      </LazyMotion>
      {/* Sets no cookies and stores no personal data, so this needs no consent
          banner. It is a no-op outside a Vercel deployment. */}
      <Analytics />
    </ModeProvider>
  )
}
