DROP DATABASE IF EXISTS "postgres-vizion";

CREATE DATABASE "postgres-vizion"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

DROP TABLE IF EXISTS public.reference CASCADE;
CREATE TABLE public.reference
(
    id serial NOT NULL,
    url character varying NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(url)
);

ALTER TABLE IF EXISTS public.reference
    OWNER to postgres;

DROP TABLE IF EXISTS public.result;
CREATE TABLE public.result
(
    id serial NOT NULL,
    reference_id bigint NOT NULL,
    data json NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    FOREIGN KEY (reference_id)
        REFERENCES public.reference (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
);

ALTER TABLE IF EXISTS public.result
    OWNER to postgres;
