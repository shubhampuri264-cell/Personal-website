import { useState } from 'react'
import { featuredProjects, moreProjects } from '@/data'
import { Section } from '@/components/layout/Section'
import { BountyGrid } from '@/components/bounty/BountyGrid'
import { CompactWorkList } from '@/components/bounty/CompactWorkList'
import { VideoModal } from '@/components/ui/VideoModal'

export function ProjectsSection({ focusedSlug }: { focusedSlug: string | null }) {
  const [video, setVideo] = useState<{ id: string; title: string; portrait?: boolean } | null>(null)

  return (
    <Section
      id="projects"
      eyebrow="What I have built"
      title="Projects"
      intro="Nine projects. The five below carry a full write-up, and four of the nine are in the hands of real users."
    >
      <BountyGrid
        items={featuredProjects}
        sectionId="projects"
        focusedSlug={focusedSlug}
        onWatchDemo={(id, title, portrait) => setVideo({ id, title, portrait })}
      />

      <CompactWorkList items={moreProjects} />

      <VideoModal
        youtubeId={video?.id ?? null}
        title={video?.title ?? ''}
        portrait={video?.portrait}
        onClose={() => setVideo(null)}
      />
    </Section>
  )
}
