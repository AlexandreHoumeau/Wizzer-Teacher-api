const select = 'email civility firstName lastName phone picture _profile _resumes _salary _languages _scores _affinities'
const populate = [
  { path: '_profile', select: 'headline functions locations experienceLevel studyLevel sectors' },
  { path: '_resumes', select: '_id', match: { isVisible: true }},
  { path: '_salary', select: 'now wanted' },
  { path: '_scores', select: '_id', match: { _test: '586b6fb2d4d6efd73bbc91d3' }},
  { path: '_affinities', select: 'title' }
]

const points = {
  email: { value: 8, text: 'Email' },
  civility: { value: 5, text: 'Civilité' },
  firstName: { value: 5, text: 'Prénom' },
  lastName: { value: 5, text: 'Nom' },
  phone: { value: 8, text: 'Téléphone' },
  picture: { value: 5, text: 'Photo' },
  headline: { value: 5, text: 'Intitulé de votre poste' },
  functions: { value: 5, text: 'Fonctions' },
  sectors: { value: 3, text: 'Secteurs' },
  locations: { value: 5, text: 'Localisation' },
  experienceLevel: { value: 5, text: "Niveau d'expérience" },
  studyLevel: { value: 5, text: "Niveau d'études" },
  resume: { value: 7, text: 'CV' },
  fixedNow: { value: 2, text: 'Salaire fixe actuel' },
  variableNow: { value: 2, text: 'Salaire variable actuel' },
  fixedWanted: { value: 3, text: 'Salaire fixe souhaité' },
  variableWanted: { value: 3, text: 'Salaire variable souhaité' },
  language: { value: 2, text: 'Langues' },
  score: { value: 10, text: 'Test de vente' },
  cycleAffinities: { value: 2, text: 'Affinités : cycles de vente' },
  sizeAffinities: { value: 2, text: 'Affinités: types de structure' },
  interlocutorAffinities: { value: 3, text: 'Affinités: interlocuteurs' }
}

const calcul = (user) => {
  let total = 0
  const missing = []
  if (!user) {
    return { total, missing }
  }
  const mapping = {
    email: user.email,
    civility: user.civility,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    picture: user.picture,
    headline: user._profile ? user._profile.headline : null,
    functions: user._profile ? user._profile.functions : null,
    sectors: user._profile ? user._profile.sectors : null,
    locations: user._profile ? user._profile.locations : null,
    experienceLevel: user._profile ? user._profile.experienceLevel : null,
    studyLevel: user._profile ? user._profile.studyLevel : null,
    resume: user._resumes,
    fixedNow: user._salary && user._salary.now && user._salary.now.fixed,
    variableNow: user._salary && user._salary.now && user._salary.now.variable,
    fixedWanted: user._salary && user._salary.wanted && user._salary.wanted.fixed,
    variableWanted: user._salary && user._salary.wanted && user._salary.wanted.variable,
    language: user._languages,
    score: user._scores,
    cycleAffinities: user._affinities.filter((aff) => aff.title === 'cycles'),
    sizeAffinities: user._affinities.filter((aff) => aff.title === 'sizes'),
    interlocutorAffinities: user._affinities.filter((aff) => aff.title === 'interlocutors')
  }

  for (const key of Object.keys(mapping)) {
    if (((Array.isArray(mapping[key]) && mapping[key].length) || (!Array.isArray(mapping[key]) && mapping[key])) && points[key]) {
      total += points[key].value
    } else {
      missing.push(points[key].text)
    }
  }

  return { total, missing }
}

export default { calcul, select, populate }
