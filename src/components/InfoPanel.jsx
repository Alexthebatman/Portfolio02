function InfoPanel({ stroke }) {
return (
    <section className="info-panel" aria-live="polite">
        <h2 style={{ color: stroke.color }}>{stroke.name} Stroke</h2>
        <p className="key-point">{stroke.keyPoint}</p>
        <p className="description">{stroke.description}</p>
    </section>
);
}

export default InfoPanel;

// this section sets up the info panel and alerts screen readers when it changes. I tried to set it up to be accesible and also visually pleasing.