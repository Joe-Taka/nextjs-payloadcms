type TFn = (roles: string[]) => () => ({ user: { age: number } })

const foo: TFn = (roles) => () => {
    return { user: { age: 12 } }
}
