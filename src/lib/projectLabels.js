const PROJECT_TITLES = Object.freeze({
  spora: 'Spora',
  choreomania: 'Choreomania',
  sasscii: 'SAS-SCII',
  puelladatabase: 'Puella Database',
  'crap-book': 'CRAP-BOOK',
  mtholly: 'The Mount Holly Estate',
  charisma: 'CHAR/ISMA',
  xplorer: 'XPlorer',
})

export function getProjectTitle(slug) {
  return PROJECT_TITLES[slug] ?? slug
}

export function formatStackLabel(iconName) {
  if (!iconName) return 'Tecnología'
  return iconName
    .replace(/([a-z])([0-9])/gi, '$1 $2')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase())
}
