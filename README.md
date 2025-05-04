# Demo of Logger Scopes in node implemented with `AsyncLocalStorage` from async_hooks

```
npm install
npm run dev
```

Open `http://localhost:3000/hello`, quickly press F5 several times.

Expected output:

```log
[18:52:18.852] INFO (34260): Server is running on http://localhost:3000
[18:52:21.901] INFO (34260): [/hello] [Id=0] Computing...
[18:52:22.043] INFO (34260): [/hello] [Id=1] Computing...
[18:52:22.167] INFO (34260): [/hello] [Id=2] Computing...
[18:52:23.909] INFO (34260): [/hello] [Id=0] Done!
[18:52:24.057] INFO (34260): [/hello] [Id=1] Done!
[18:52:24.176] INFO (34260): [/hello] [Id=2] Done!
```
