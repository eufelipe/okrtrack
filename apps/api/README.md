# OKRTrack – API V1

> Versão inicial da API REST para gerenciamento de OKRs multi‑tenant.

- Stack principal: Node.js + TypeScript, Fastify, Mysql (Prisma)
- Padrão: Clean Architecture
- Base URL: `/api/v1`

---

## Endpoints essenciais

### 🔐 Autenticação

| Método | Rota             | Descrição                                  |
| ------ | ---------------- | ------------------------------------------ |
| POST   | `/auth/register` | Cria usuário e espaço pessoal (opcional)   |
| POST   | `/auth/login`    | Retorna access token (JWT) e refresh token |
| POST   | `/auth/refresh`  | Gera novo access token a partir do refresh |
| POST   | `/auth/logout`   | Revoga o token atual                       |

### 🏢 Espaços (Tenants)

| Método | Rota               | Descrição                          |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/spaces`          | Lista espaços do usuário           |
| POST   | `/spaces`          | Cria espaço (pessoal ou de time)   |
| GET    | `/spaces/:spaceId` | Detalhes do espaço                 |
| PATCH  | `/spaces/:spaceId` | Atualiza nome, slug, domínio, etc. |
| DELETE | `/spaces/:spaceId` | Desativa o espaço                  |

### 👥 Usuários

| Método | Rota                             | Descrição                               |
| ------ | -------------------------------- | --------------------------------------- |
| GET    | `/spaces/:spaceId/users`         | Lista usuários do espaço                |
| POST   | `/spaces/:spaceId/users/invite`  | Convida usuário via e‑mail              |
| PATCH  | `/spaces/:spaceId/users/:userId` | Atualiza role (ADMIN / EDITOR / VIEWER) |
| DELETE | `/spaces/:spaceId/users/:userId` | Remove usuário do espaço                |

### 🎯 OKRs

| Método | Rota                          | Descrição                      |
| ------ | ----------------------------- | ------------------------------ |
| GET    | `/spaces/:spaceId/objectives` | Lista objetivos do espaço      |
| POST   | `/spaces/:spaceId/objectives` | Cria objetivo                  |
| GET    | `/objectives/:objectiveId`    | Detalha objetivo               |
| PATCH  | `/objectives/:objectiveId`    | Atualiza título, owner, status |
| DELETE | `/objectives/:objectiveId`    | Remove objetivo                |

#### Key Results

| Método | Rota                                   | Descrição                  |
| ------ | -------------------------------------- | -------------------------- |
| POST   | `/objectives/:objectiveId/key-results` | Adiciona KR                |
| PATCH  | `/key-results/:krId`                   | Atualiza progresso ou meta |
| DELETE | `/key-results/:krId`                   | Remove KR                  |

---

## Convenções gerais

- Todas as rotas (exceto `/auth/*`) exigem header `Authorization: Bearer <token>`.
- Respostas seguem formato JSON unificado:
  ```json
  {
    "data": {
      /* payload */
    },
    "meta": {
      /* paginação etc. */
    },
    "errors": []
  }
  ```

## Roadmap pós‑V1 (resumido)

- Webhooks de eventos
- Filtros avançados e busca full‑text
- IA para recomendações de progresso
