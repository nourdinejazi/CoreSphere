# CoreSphere (ERP)

![localhost_3000_chic_gestioncheques](https://github.com/user-attachments/assets/b31e5b3d-06c2-4726-8d59-8d6801666612)
![localhost_3000_chic_gestioncheques (2)](https://github.com/user-attachments/assets/a45b0d4b-4b4d-488b-bc85-471d6251bceb)
![localhost_3000_jarr_gestioncheques_versement_new (2)](https://github.com/user-attachments/assets/802a3d25-4efc-4411-92ea-6b776ca08acb)
![localhost_3000_jarr_gestioncheques_versement_new (3)](https://github.com/user-attachments/assets/367079b4-0142-4ace-9fef-d49ee2ae412f)

This is an Enterprise resource planning (ERP) SaaS that I'm building. It manages multiple branches with a theme for each branch.
The project is still work in progress!!

### Prerequisites

**Node version 18.7.x**


### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=
DIRECT_URL=

AUTH_SECRET=

NEXT_PUBLIC_APP_URL=
```

### Setup Prisma
```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
