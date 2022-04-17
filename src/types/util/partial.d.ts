/** Make every property of a type optional recursively */
export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>
	  }
	: T

/** Return the optional properties of a type */
export type OptionalPropertyOf<T extends object> = Exclude<
	{
		[K in keyof T]: T extends Record<K, T[K]> ? never : K
	}[keyof T],
	undefined
>

/** Require only the optional properties of a type */
export type RequireOptionalPropertiesOf<T extends object> = {
	[K in OptionalPropertyOf<T>]: NonNullable<T[K]>
}
