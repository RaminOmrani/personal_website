import { useState, type CSSProperties } from 'react';
import { useCopy } from '../../../v3/src/data/copy';
import { useProjects, type Category } from '../../../v3/src/data/projects';
import { digits, useLang } from '../../../v3/src/i18n';
import { Grad } from '../../../v3/src/ui/Text';
import { useAppCopy } from '../copy';
import { Img, Link } from '../ui/bits';
import { Icon } from '../ui/Icon';

/** Survives a trip into a project and back. */
let remembered: Category | 'all' = 'all';

export function Work() {
  const lang = useLang();
  const { projects, categories } = useProjects();
  const { work, ui } = useCopy();
  const t = useAppCopy();
  const [filter, setFilter] = useState(remembered);
  const list = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter));
  const count = (id: Category | 'all') => (id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(id)).length);

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">{work.eyebrow}</p>
        <h1 className="display">
          <Grad text={work.title} />
        </h1>
        <p className="lead">{work.text}</p>
      </header>

      <div className="chips-bar">
        <div className="chips" role="group" aria-label={ui.filter}>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={filter === c.id}
              onClick={() => {
                remembered = c.id;
                setFilter(c.id);
              }}
            >
              {c.label}
              <span className="chip-count">{digits(count(c.id), lang)}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {t.work.count(digits(list.length, lang))}
      </p>
      <ul className="plist" key={filter}>
        {list.map((p, i) => (
          <li key={p.slug} style={{ '--i': i } as CSSProperties}>
            <Link to={`/work/${p.slug}`} className="pcard" style={{ '--tint': p.tint, '--brand': p.color } as CSSProperties}>
              <span className="pcard-media">
                <Img src={p.cover.desktop ?? p.cover.phone ?? ''} alt="" eager={i < 2} width={1280} height={800} />
                {p.cover.phone && p.cover.desktop && (
                  <span className="pcard-phone">
                    <Img src={p.cover.phone} alt="" width={540} height={1169} />
                  </span>
                )}
              </span>
              <span className="pcard-body">
                <img className="logo-tile" src={p.logo} alt="" width={44} height={44} />
                <span className="pcard-text">
                  <strong>{p.name}</strong>
                  <small>{p.kind}</small>
                </span>
                <Icon name="chevron" size={18} className="pcard-go" />
              </span>
              <span className="pcard-pitch">{p.pitch}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
