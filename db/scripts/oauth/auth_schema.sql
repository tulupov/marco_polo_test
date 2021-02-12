CREATE TABLE oauth_tokens (
    id SERIAL NOT NULL PRIMARY KEY,
    access_token text NOT NULL,
    access_token_expires_at timestamp without time zone NOT NULL,
    client_id text NOT NULL,
    refresh_token text NOT NULL,
    refresh_token_expires_at timestamp without time zone NOT NULL,
    user_id INTEGER NOT NULL
);

CREATE TABLE oauth_codes (
    id SERIAL NOT NULL PRIMARY KEY,
    authorization_code text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    client_id text NOT NULL,
    user_id INTEGER NOT NULL
);

CREATE TABLE oauth_clients (
    client_id text NOT NULL,
    client_secret text NOT NULL,
    redirect_uri text NOT NULL
);

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    password text NOT NULL
);

ALTER TABLE ONLY oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (client_id, client_secret);

INSERT INTO public.oauth_clients (client_id, client_secret, redirect_uri) VALUES ('product', 'product', 'http://localhost:8080/callback');
INSERT INTO public.users (id, username, password) VALUES (2, 'max', '$2b$10$5ttMVirrZ/kTKLZWwbq/6eN13j5zG44Z06VtMXhZnexxL4XaJZKQC');
INSERT INTO public.users (id, username, password) VALUES (3, 'nick', '$2b$10$8/nGpYjG2FLU1iV2U9ILYeT3jCntqub0/iN5Vu1LmjgksMYoQ3L.q');
INSERT INTO public.users (id, username, password) VALUES (4, 'eva', '$2b$10$1wW7nBAqJ.M0x3Iekvik2OVFztIynTioNTa3uYjaOrlOFEw9VcKdu');