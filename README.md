# Dynamic Needs Analysis

## Local Supabase Setup

Login to supabase cli

```bash
bun supabase login
```

To start up the local supabase instance.

> [!NOTE]  
> (Make sure Docker is installed and running)

```bash
bun db:start
```

- Place the `API URL` and `anon key` in a `.env.local`

- Click on `Studio URL` to open the local Supabase Dashboard.

To stop the local supabase instance.

```bash
bun db:stop
```
