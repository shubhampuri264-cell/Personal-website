import { skillGroups } from '@/data'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/ui/Reveal'
import { hasIcon, Icon } from '@/lib/icons'
import styles from './SkillsSection.module.css'

/**
 * Skills as evidence, not a logo wall. `usedIn` names where the skill was
 * actually used, so a recruiter can check the claim against a project two
 * sections up instead of taking it on faith.
 *
 * No proficiency badge. A "Working" tag next to a skill is a hedge that invites
 * the reader to discount everything around it — so weak entries were cut from
 * the data instead of being labelled as weak here.
 */
export function SkillsSection() {
  return (
    <Section
      id="skills"
      eyebrow="What I work with"
      title="Skills"
      intro="Everything here shipped in something below. The line under each one says where."
    >
      <div className={styles.grid}>
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} index={i} className={styles.cell}>
            <div className={styles.group} data-accent={group.accent}>
              <header className={styles.groupHead}>
                <h3 className={styles.groupTitle}>{group.label}</h3>
                <p className={styles.groupBlurb}>{group.blurb}</p>
              </header>

              <ul className={styles.skills}>
                {group.skills.map((skill) => (
                  <li key={skill.name} className={styles.skill}>
                    {hasIcon(skill.icon) && (
                      <Icon name={skill.icon!} size={15} className={styles.skillIcon} />
                    )}
                    <span className={styles.skillName}>{skill.name}</span>
                    {skill.usedIn && skill.usedIn.length > 0 && (
                      <span className={styles.skillUsed}>{skill.usedIn.join(' · ')}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
