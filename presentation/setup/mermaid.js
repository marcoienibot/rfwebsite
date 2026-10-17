// Colours for the Mermaid diagrams in slides.md (Rust Foundation orange on white).
export default function setupMermaid() {
  return {
    theme: 'base',
    themeVariables: {
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      fontSize: '16px',
      primaryColor: '#ffffff',
      primaryTextColor: '#141414',
      primaryBorderColor: '#e43716',
      secondaryColor: '#fdf0ec',
      tertiaryColor: '#f6f6f6',
      lineColor: '#e43716',
      edgeLabelBackground: '#ffffff',
      clusterBkg: '#fafafa',
      clusterBorder: '#e6e6e6',
    },
    flowchart: { curve: 'basis', padding: 14 },
  }
}
