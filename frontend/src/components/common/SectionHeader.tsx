interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      {eyebrow && (
        <span className="section-header__eyebrow">
          {eyebrow}
        </span>
      )}

      <h2>{title}</h2>

      {description && <p>{description}</p>}
    </div>
  );
}