import { makeHello } from 'shared/module'

print(makeHello('main.server.ts'))

const foo_bar = 'bar'

const x = {
	foo: 1,
	bar: 2,
	hello: 'string',
	oncomplete: () => {
		return 2
	},
}
