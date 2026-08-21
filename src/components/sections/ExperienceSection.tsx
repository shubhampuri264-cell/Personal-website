import { experience } from '@/data'
import { Section } from '@/components/layout/Section'
import { BountyGrid } from '@/components/bounty/BountyGrid'

export function ExperienceSection({ focusedSlug }: { focusedSlug: string | null }) {
  return (
    <Section
      id="experience"
      eyebrow="Where I have shipped"
      title="Experience"
      intro="Four roles across product engineering, AI evaluation, teaching, and hardware support."
    >
      {/* No summary rail. It printed the same three numbers the first three
          cards print immediately below it, at a fifth of the size, so a reader
          met "100+ active learners" twice before learning anything new. */}
      <BountyGrid
        items={experience}
        sectionId="experience"
        focusedSlug={focusedSlug}
        density="wide"
      />
    </Section>
  )
}
