// ================================================================
// 📺 SANTÉ NA MÍDIA
// Aparições da clínica e da equipe em veículos de comunicação.
// É conteúdo de AUTORIDADE — vale mais que depoimento, porque a
// validação vem de fora.
//
// ADICIONAR: copie um bloco { ... } e cole antes do fechamento ]
// O vídeo carrega por "facade": só a capa aparece, e o player do
// YouTube só é montado depois do clique. Ver VideoFacade.tsx.
// ================================================================

export interface Midia {
  id:            string
  youtubeId:     string   // o que vem depois de "v=" na URL do YouTube
  titulo:        string
  veiculo:       string   // programa / emissora / canal
  participante:  string   // quem da Santé aparece
  resumo:        string
  duracaoISO:    string   // formato schema.org, ex: 'PT21M13S'
  duracaoLabel:  string   // como aparece no site, ex: '21 min'
  /** AAAA-MM-DD. Necessário para o rich snippet de vídeo do Google. */
  publicadoEm?:  string
  destaque?:     boolean  // true = aparece na home
}

export const MIDIA: Midia[] = [
  {
    // ✅ Autorização de uso confirmada pelo Júlio em 16/09/2026.
    id:           'argumento-natalia-2026',
    youtubeId:    'ug7T97FkbIc',
    titulo:       'Mauro Bonna entrevista a fisioterapeuta Natália Silva',
    veiculo:      'Programa Argumento',
    participante: 'Dra. Natália Silva',

    // ⚠️ JÚLIO: resumo escrito a partir do título e dos primeiros
    //    minutos da entrevista. PASSE PELA NAT antes de publicar —
    //    conteúdo clínico não pode ser resumido por chute.
    resumo:
      'Em entrevista ao jornalista Mauro Bonna, a fisioterapeuta Natália Silva ' +
      'fala sobre Pilates, reabilitação e cuidado com o corpo.',

    duracaoISO:   'PT21M13S',
    duracaoLabel: '21 min',

    // ⚠️ TODO-DATA: a data exata não foi confirmada (o YouTube mostrava
    //    "há 1 mês" em 16/09/2026). O Google exige uploadDate para o
    //    rich snippet de vídeo — sem ela o schema é omitido.
    //    Preencha no formato 'AAAA-MM-DD'.
    // publicadoEm: '2026-08-__',

    destaque: true,
  },
]
