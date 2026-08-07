import { hackathons } from '@/data'
import { Section } from '@/components/layout/Section'
import { BountyGrid } from '@/components/bounty/BountyGrid'

export function HackathonsSection({ focusedSlug }: { focusedSlug: string | null }) {
  return (
    <Section
      id="hackathons"
      eyebrow="Built under a clock"
      title="Hackathons"
      intro="What gets shipped when the deadline is measured in hours."
    >
      <BountyGrid items={hackathons} sectionId="hackathons" focusedSlug={focusedSlug} />
    </Section>
  )
}
