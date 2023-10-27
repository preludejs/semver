import * as Cmp from '@prelude/cmp'
import parse from './parse.js'
import type { Semver } from './prelude.js'

const cmp =
  (a: string | Semver, b: string | Semver): Cmp.R => {
    if (typeof a === 'string') {
      return cmp(parse(a), b)
    }
    if (typeof b === 'string') {
      return cmp(a, parse(b))
    }
    return Cmp.chain<Semver>(
      Cmp.map(Cmp.number, _ => _.major),
      Cmp.map(Cmp.number, _ => _.minor),
      Cmp.map(Cmp.number, _ => _.patch),
      Cmp.map(Cmp.string, _ => _.prerelease ?? ''),
      Cmp.map(Cmp.string, _ => _.build ?? ''),
      Cmp.map(Cmp.string, _ => _.date ?? '')
    )(a, b)
  }

export default cmp
