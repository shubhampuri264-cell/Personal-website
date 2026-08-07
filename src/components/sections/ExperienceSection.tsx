import { experience, railItems } from '@/data'
import { Section } from '@/components/layout/Section'
import { BountyGrid } from '@/components/bounty/BountyGrid'
import { BountyRail } from '@/components/bounty/BountyRail'

export function ExperienceSection({ focusedSlug }: { focusedSlug: string | null }) {
  return (
    <Section
      id="experience"
      eyebrow="Where I have shipped"
      title="Experience"
      intro="Four roles across product engineering, AI evaluation, teaching, and hardware support."
    >
      <BountyRail items={railItems(experience)} label="Highlights" />
      <BountyGrid
        items={experience}
        sectionId="experience"
        focusedSlug={focusedSlug}
        density="wide"
      />
    </Section>
  )
}
