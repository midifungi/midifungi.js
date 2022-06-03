import {gemoji} from 'gemoji'
export default {
  list: gemoji,
  get all () {
    const list = []
    gemoji.forEach(emoji => list.push(emoji.emoji))
    return list
  },
  tag: {
    get smilies () {
      return (gemoji.filter(emoji => emoji.category === 'Smileys & Emotion')).map(emoji => emoji.emoji)
    },
    get people () {
      return (gemoji.filter(emoji => emoji.category === 'People & Body')).map(emoji => emoji.emoji)
    },
    get nature () {
      return (gemoji.filter(emoji => emoji.category === 'Animals & Nature')).map(emoji => emoji.emoji)
    },
    get food () {
      return (gemoji.filter(emoji => emoji.category === 'Food & Drink')).map(emoji => emoji.emoji)
    },
    get travel () {
      return (gemoji.filter(emoji => emoji.category === 'Travel & Places')).map(emoji => emoji.emoji)
    },
    get activities () {
      return (gemoji.filter(emoji => emoji.category === 'Activities')).map(emoji => emoji.emoji)
    },
    get objects () {
      return (gemoji.filter(emoji => emoji.category === 'Objects')).map(emoji => emoji.emoji)
    },
    get symbols () {
      return (gemoji.filter(emoji => emoji.category === 'Symbols')).map(emoji => emoji.emoji)
    },
    get flags () {
      return (gemoji.filter(emoji => emoji.category === 'Flags')).map(emoji => emoji.emoji)
    }
  }
}