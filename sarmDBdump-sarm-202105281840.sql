PGDMP     0    (                y            sarm    9.5.25    12.2 b    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16384    sarm    DATABASE     v   CREATE DATABASE sarm WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE sarm;
                postgres    false            �           0    0    DATABASE sarm    ACL     �   REVOKE ALL ON DATABASE sarm FROM PUBLIC;
REVOKE ALL ON DATABASE sarm FROM postgres;
GRANT ALL ON DATABASE sarm TO postgres;
GRANT CONNECT,TEMPORARY ON DATABASE sarm TO PUBLIC;
GRANT ALL ON DATABASE sarm TO sarm;
                   postgres    false    2247                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    6            �           0    0    SCHEMA public    ACL     �   REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    6            �            1259    16551 	   contracts    TABLE       CREATE TABLE public.contracts (
    cont_id integer NOT NULL,
    cont_code character varying,
    cont_name character varying,
    social_name character varying,
    status character varying,
    close_time character varying,
    comments character varying
);
    DROP TABLE public.contracts;
       public            sarm    false    6            �            1259    16549    contracts_cont_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.contracts_cont_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.contracts_cont_id_seq;
       public          sarm    false    202    6            �           0    0    contracts_cont_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.contracts_cont_id_seq OWNED BY public.contracts.cont_id;
          public          sarm    false    201            �            1259    16470    modules    TABLE     �   CREATE TABLE public.modules (
    modu_id integer NOT NULL,
    modu_name character varying,
    modu_url character varying NOT NULL
);
    DROP TABLE public.modules;
       public            sarm    false    6            �            1259    16468    modules_modu_id_seq    SEQUENCE     |   CREATE SEQUENCE public.modules_modu_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.modules_modu_id_seq;
       public          sarm    false    192    6            �           0    0    modules_modu_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.modules_modu_id_seq OWNED BY public.modules.modu_id;
          public          sarm    false    191            �            1259    16451    permissions    TABLE       CREATE TABLE public.permissions (
    perm_id integer NOT NULL,
    perm_name character varying NOT NULL,
    perm_tag character varying NOT NULL,
    perm_description character varying NOT NULL,
    perm_active character varying,
    modu_id character varying
);
    DROP TABLE public.permissions;
       public            sarm    false    6            �            1259    16449    permissions_perm_id_seq    SEQUENCE     �   CREATE SEQUENCE public.permissions_perm_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.permissions_perm_id_seq;
       public          sarm    false    6    190            �           0    0    permissions_perm_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.permissions_perm_id_seq OWNED BY public.permissions.perm_id;
          public          sarm    false    189            �            1259    16438    profiles_permissions    TABLE     �   CREATE TABLE public.profiles_permissions (
    profperm_id integer NOT NULL,
    prof_id integer NOT NULL,
    perm_id integer NOT NULL
);
 (   DROP TABLE public.profiles_permissions;
       public            sarm    false    6            �            1259    16436     prof_permissions_profperm_id_seq    SEQUENCE     �   CREATE SEQUENCE public.prof_permissions_profperm_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.prof_permissions_profperm_id_seq;
       public          sarm    false    6    188            �           0    0     prof_permissions_profperm_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.prof_permissions_profperm_id_seq OWNED BY public.profiles_permissions.profperm_id;
          public          sarm    false    187            �            1259    16423    profiles    TABLE     �   CREATE TABLE public.profiles (
    prof_id integer NOT NULL,
    prof_name integer NOT NULL,
    prof_active character varying
);
    DROP TABLE public.profiles;
       public            sarm    false    6            �            1259    16421    profiles_prof_id_seq    SEQUENCE     }   CREATE SEQUENCE public.profiles_prof_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.profiles_prof_id_seq;
       public          sarm    false    186    6            �           0    0    profiles_prof_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.profiles_prof_id_seq OWNED BY public.profiles.prof_id;
          public          sarm    false    185            �            1259    16398    profiles_users    TABLE     �   CREATE TABLE public.profiles_users (
    prousr_id integer NOT NULL,
    user_id integer NOT NULL,
    prof_id integer NOT NULL
);
 "   DROP TABLE public.profiles_users;
       public            sarm    false    6            �            1259    16396    profiles_users_prousr_id_seq    SEQUENCE     �   CREATE SEQUENCE public.profiles_users_prousr_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.profiles_users_prousr_id_seq;
       public          sarm    false    184    6            �           0    0    profiles_users_prousr_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.profiles_users_prousr_id_seq OWNED BY public.profiles_users.prousr_id;
          public          sarm    false    183            �            1259    16487    repositories    TABLE     �   CREATE TABLE public.repositories (
    repo_id integer NOT NULL,
    name character varying NOT NULL,
    size character varying,
    created_time timestamp(0) without time zone NOT NULL,
    url character varying NOT NULL,
    user_id integer
);
     DROP TABLE public.repositories;
       public            sarm    false    6            �            1259    16485    repositories_repo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.repositories_repo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.repositories_repo_id_seq;
       public          sarm    false    6    194            �           0    0    repositories_repo_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.repositories_repo_id_seq OWNED BY public.repositories.repo_id;
          public          sarm    false    193            �            1259    16503    services    TABLE       CREATE TABLE public.services (
    serv_id integer NOT NULL,
    serv_type_id integer NOT NULL,
    "time" character varying,
    sector character varying,
    quantity character varying,
    status character varying,
    equipment character varying,
    repo_id integer
);
    DROP TABLE public.services;
       public            sarm    false    6            �            1259    16535    services_data    TABLE     "  CREATE TABLE public.services_data (
    serv_data_id integer NOT NULL,
    location character varying,
    "time" character varying,
    maintance_status character varying,
    cause character varying,
    observation character varying,
    status character varying,
    serv_id integer
);
 !   DROP TABLE public.services_data;
       public            sarm    false    6            �            1259    16533    services_datee_serv_data_id_seq    SEQUENCE     �   CREATE SEQUENCE public.services_datee_serv_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.services_datee_serv_data_id_seq;
       public          sarm    false    200    6            �           0    0    services_datee_serv_data_id_seq    SEQUENCE OWNED BY     b   ALTER SEQUENCE public.services_datee_serv_data_id_seq OWNED BY public.services_data.serv_data_id;
          public          sarm    false    199            �            1259    16501    services_serv_id_seq    SEQUENCE     }   CREATE SEQUENCE public.services_serv_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.services_serv_id_seq;
       public          sarm    false    196    6            �           0    0    services_serv_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.services_serv_id_seq OWNED BY public.services.serv_id;
          public          sarm    false    195            �            1259    16519    services_types    TABLE     �   CREATE TABLE public.services_types (
    serv_type_id integer NOT NULL,
    serv_name character varying,
    cont_id integer NOT NULL
);
 "   DROP TABLE public.services_types;
       public            sarm    false    6            �            1259    16517    services_types_serv_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.services_types_serv_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.services_types_serv_type_id_seq;
       public          sarm    false    6    198            �           0    0    services_types_serv_type_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.services_types_serv_type_id_seq OWNED BY public.services_types.serv_type_id;
          public          sarm    false    197            �            1259    16571    session    TABLE     �   CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);
    DROP TABLE public.session;
       public            sarm    false    6            �            1259    16388    users    TABLE     I  CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying NOT NULL,
    user_password character varying NOT NULL,
    user_username character varying NOT NULL,
    time_created timestamp(0) without time zone NOT NULL,
    user_id_created character varying,
    user_active boolean DEFAULT true
);
    DROP TABLE public.users;
       public            sarm    false    6            �            1259    16386    users_user_id_seq    SEQUENCE     z   CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          sarm    false    6    182            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          sarm    false    181                       2604    16554    contracts cont_id    DEFAULT     v   ALTER TABLE ONLY public.contracts ALTER COLUMN cont_id SET DEFAULT nextval('public.contracts_cont_id_seq'::regclass);
 @   ALTER TABLE public.contracts ALTER COLUMN cont_id DROP DEFAULT;
       public          sarm    false    201    202    202                       2604    16473    modules modu_id    DEFAULT     r   ALTER TABLE ONLY public.modules ALTER COLUMN modu_id SET DEFAULT nextval('public.modules_modu_id_seq'::regclass);
 >   ALTER TABLE public.modules ALTER COLUMN modu_id DROP DEFAULT;
       public          sarm    false    191    192    192                       2604    16454    permissions perm_id    DEFAULT     z   ALTER TABLE ONLY public.permissions ALTER COLUMN perm_id SET DEFAULT nextval('public.permissions_perm_id_seq'::regclass);
 B   ALTER TABLE public.permissions ALTER COLUMN perm_id DROP DEFAULT;
       public          sarm    false    190    189    190                       2604    16426    profiles prof_id    DEFAULT     t   ALTER TABLE ONLY public.profiles ALTER COLUMN prof_id SET DEFAULT nextval('public.profiles_prof_id_seq'::regclass);
 ?   ALTER TABLE public.profiles ALTER COLUMN prof_id DROP DEFAULT;
       public          sarm    false    186    185    186                       2604    16441     profiles_permissions profperm_id    DEFAULT     �   ALTER TABLE ONLY public.profiles_permissions ALTER COLUMN profperm_id SET DEFAULT nextval('public.prof_permissions_profperm_id_seq'::regclass);
 O   ALTER TABLE public.profiles_permissions ALTER COLUMN profperm_id DROP DEFAULT;
       public          sarm    false    187    188    188                       2604    16401    profiles_users prousr_id    DEFAULT     �   ALTER TABLE ONLY public.profiles_users ALTER COLUMN prousr_id SET DEFAULT nextval('public.profiles_users_prousr_id_seq'::regclass);
 G   ALTER TABLE public.profiles_users ALTER COLUMN prousr_id DROP DEFAULT;
       public          sarm    false    183    184    184                       2604    16490    repositories repo_id    DEFAULT     |   ALTER TABLE ONLY public.repositories ALTER COLUMN repo_id SET DEFAULT nextval('public.repositories_repo_id_seq'::regclass);
 C   ALTER TABLE public.repositories ALTER COLUMN repo_id DROP DEFAULT;
       public          sarm    false    194    193    194                       2604    16506    services serv_id    DEFAULT     t   ALTER TABLE ONLY public.services ALTER COLUMN serv_id SET DEFAULT nextval('public.services_serv_id_seq'::regclass);
 ?   ALTER TABLE public.services ALTER COLUMN serv_id DROP DEFAULT;
       public          sarm    false    196    195    196                       2604    16538    services_data serv_data_id    DEFAULT     �   ALTER TABLE ONLY public.services_data ALTER COLUMN serv_data_id SET DEFAULT nextval('public.services_datee_serv_data_id_seq'::regclass);
 I   ALTER TABLE public.services_data ALTER COLUMN serv_data_id DROP DEFAULT;
       public          sarm    false    200    199    200                       2604    16522    services_types serv_type_id    DEFAULT     �   ALTER TABLE ONLY public.services_types ALTER COLUMN serv_type_id SET DEFAULT nextval('public.services_types_serv_type_id_seq'::regclass);
 J   ALTER TABLE public.services_types ALTER COLUMN serv_type_id DROP DEFAULT;
       public          sarm    false    197    198    198                       2604    16391    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          sarm    false    181    182    182            �          0    16551 	   contracts 
   TABLE DATA           m   COPY public.contracts (cont_id, cont_code, cont_name, social_name, status, close_time, comments) FROM stdin;
    public          sarm    false    202            �          0    16470    modules 
   TABLE DATA           ?   COPY public.modules (modu_id, modu_name, modu_url) FROM stdin;
    public          sarm    false    192            �          0    16451    permissions 
   TABLE DATA           k   COPY public.permissions (perm_id, perm_name, perm_tag, perm_description, perm_active, modu_id) FROM stdin;
    public          sarm    false    190            �          0    16423    profiles 
   TABLE DATA           C   COPY public.profiles (prof_id, prof_name, prof_active) FROM stdin;
    public          sarm    false    186            �          0    16438    profiles_permissions 
   TABLE DATA           M   COPY public.profiles_permissions (profperm_id, prof_id, perm_id) FROM stdin;
    public          sarm    false    188            �          0    16398    profiles_users 
   TABLE DATA           E   COPY public.profiles_users (prousr_id, user_id, prof_id) FROM stdin;
    public          sarm    false    184            �          0    16487    repositories 
   TABLE DATA           W   COPY public.repositories (repo_id, name, size, created_time, url, user_id) FROM stdin;
    public          sarm    false    194            �          0    16503    services 
   TABLE DATA           o   COPY public.services (serv_id, serv_type_id, "time", sector, quantity, status, equipment, repo_id) FROM stdin;
    public          sarm    false    196            �          0    16535    services_data 
   TABLE DATA           ~   COPY public.services_data (serv_data_id, location, "time", maintance_status, cause, observation, status, serv_id) FROM stdin;
    public          sarm    false    200            �          0    16519    services_types 
   TABLE DATA           J   COPY public.services_types (serv_type_id, serv_name, cont_id) FROM stdin;
    public          sarm    false    198            �          0    16571    session 
   TABLE DATA           4   COPY public.session (sid, sess, expire) FROM stdin;
    public          sarm    false    203            �          0    16388    users 
   TABLE DATA           }   COPY public.users (user_id, user_name, user_password, user_username, time_created, user_id_created, user_active) FROM stdin;
    public          sarm    false    182            �           0    0    contracts_cont_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.contracts_cont_id_seq', 1, false);
          public          sarm    false    201            �           0    0    modules_modu_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.modules_modu_id_seq', 1, false);
          public          sarm    false    191            �           0    0    permissions_perm_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.permissions_perm_id_seq', 1, false);
          public          sarm    false    189            �           0    0     prof_permissions_profperm_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.prof_permissions_profperm_id_seq', 1, false);
          public          sarm    false    187            �           0    0    profiles_prof_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.profiles_prof_id_seq', 1, false);
          public          sarm    false    185            �           0    0    profiles_users_prousr_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.profiles_users_prousr_id_seq', 1, false);
          public          sarm    false    183            �           0    0    repositories_repo_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.repositories_repo_id_seq', 1, false);
          public          sarm    false    193            �           0    0    services_datee_serv_data_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.services_datee_serv_data_id_seq', 1, false);
          public          sarm    false    199            �           0    0    services_serv_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.services_serv_id_seq', 1, false);
          public          sarm    false    195            �           0    0    services_types_serv_type_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.services_types_serv_type_id_seq', 1, false);
          public          sarm    false    197            �           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);
          public          sarm    false    181            ,           2606    16559    contracts contracts_pk 
   CONSTRAINT     Y   ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_pk PRIMARY KEY (cont_id);
 @   ALTER TABLE ONLY public.contracts DROP CONSTRAINT contracts_pk;
       public            sarm    false    202            "           2606    16478    modules modules_pk 
   CONSTRAINT     U   ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pk PRIMARY KEY (modu_id);
 <   ALTER TABLE ONLY public.modules DROP CONSTRAINT modules_pk;
       public            sarm    false    192                        2606    16459    permissions permissions_pk 
   CONSTRAINT     ]   ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pk PRIMARY KEY (perm_id);
 D   ALTER TABLE ONLY public.permissions DROP CONSTRAINT permissions_pk;
       public            sarm    false    190                       2606    16443 ,   profiles_permissions profiles_permissions_pk 
   CONSTRAINT     s   ALTER TABLE ONLY public.profiles_permissions
    ADD CONSTRAINT profiles_permissions_pk PRIMARY KEY (profperm_id);
 V   ALTER TABLE ONLY public.profiles_permissions DROP CONSTRAINT profiles_permissions_pk;
       public            sarm    false    188                       2606    16428    profiles profiles_pk 
   CONSTRAINT     W   ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pk PRIMARY KEY (prof_id);
 >   ALTER TABLE ONLY public.profiles DROP CONSTRAINT profiles_pk;
       public            sarm    false    186                       2606    16430     profiles_users profiles_users_pk 
   CONSTRAINT     e   ALTER TABLE ONLY public.profiles_users
    ADD CONSTRAINT profiles_users_pk PRIMARY KEY (prousr_id);
 J   ALTER TABLE ONLY public.profiles_users DROP CONSTRAINT profiles_users_pk;
       public            sarm    false    184            $           2606    16495    repositories repositories_pk 
   CONSTRAINT     _   ALTER TABLE ONLY public.repositories
    ADD CONSTRAINT repositories_pk PRIMARY KEY (repo_id);
 F   ALTER TABLE ONLY public.repositories DROP CONSTRAINT repositories_pk;
       public            sarm    false    194            *           2606    16543    services_data services_datee_pk 
   CONSTRAINT     g   ALTER TABLE ONLY public.services_data
    ADD CONSTRAINT services_datee_pk PRIMARY KEY (serv_data_id);
 I   ALTER TABLE ONLY public.services_data DROP CONSTRAINT services_datee_pk;
       public            sarm    false    200            &           2606    16511    services services_pk 
   CONSTRAINT     W   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pk PRIMARY KEY (serv_id);
 >   ALTER TABLE ONLY public.services DROP CONSTRAINT services_pk;
       public            sarm    false    196            (           2606    16527     services_types services_types_pk 
   CONSTRAINT     h   ALTER TABLE ONLY public.services_types
    ADD CONSTRAINT services_types_pk PRIMARY KEY (serv_type_id);
 J   ALTER TABLE ONLY public.services_types DROP CONSTRAINT services_types_pk;
       public            sarm    false    198            /           2606    16578    session session_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public            sarm    false    203                       2606    16406    users users_pk 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
       public            sarm    false    182            -           1259    16579    IDX_session_expire    INDEX     J   CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);
 (   DROP INDEX public."IDX_session_expire";
       public            sarm    false    203            3           2606    16460 #   profiles_permissions permissions_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.profiles_permissions
    ADD CONSTRAINT permissions_fk FOREIGN KEY (perm_id) REFERENCES public.permissions(perm_id);
 M   ALTER TABLE ONLY public.profiles_permissions DROP CONSTRAINT permissions_fk;
       public          sarm    false    188    2080    190            1           2606    16431    profiles_users profiles_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.profiles_users
    ADD CONSTRAINT profiles_fk FOREIGN KEY (prof_id) REFERENCES public.profiles(prof_id);
 D   ALTER TABLE ONLY public.profiles_users DROP CONSTRAINT profiles_fk;
       public          sarm    false    184    186    2076            2           2606    16444 ,   profiles_permissions profiles_permissions_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.profiles_permissions
    ADD CONSTRAINT profiles_permissions_fk FOREIGN KEY (prof_id) REFERENCES public.profiles(prof_id);
 V   ALTER TABLE ONLY public.profiles_permissions DROP CONSTRAINT profiles_permissions_fk;
       public          sarm    false    186    2076    188            0           2606    16413     profiles_users profiles_users_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.profiles_users
    ADD CONSTRAINT profiles_users_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 J   ALTER TABLE ONLY public.profiles_users DROP CONSTRAINT profiles_users_fk;
       public          sarm    false    182    184    2072            4           2606    16496    repositories repositories_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.repositories
    ADD CONSTRAINT repositories_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 F   ALTER TABLE ONLY public.repositories DROP CONSTRAINT repositories_fk;
       public          sarm    false    2072    194    182            8           2606    16544    services_data services_data_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.services_data
    ADD CONSTRAINT services_data_fk FOREIGN KEY (serv_id) REFERENCES public.services(serv_id);
 H   ALTER TABLE ONLY public.services_data DROP CONSTRAINT services_data_fk;
       public          sarm    false    196    200    2086            5           2606    16512    services services_fk    FK CONSTRAINT        ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_fk FOREIGN KEY (repo_id) REFERENCES public.repositories(repo_id);
 >   ALTER TABLE ONLY public.services DROP CONSTRAINT services_fk;
       public          sarm    false    196    2084    194            6           2606    16528    services services_types_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_types_fk FOREIGN KEY (serv_type_id) REFERENCES public.services_types(serv_type_id);
 D   ALTER TABLE ONLY public.services DROP CONSTRAINT services_types_fk;
       public          sarm    false    198    2088    196            7           2606    16560     services_types services_types_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.services_types
    ADD CONSTRAINT services_types_fk FOREIGN KEY (cont_id) REFERENCES public.contracts(cont_id);
 J   ALTER TABLE ONLY public.services_types DROP CONSTRAINT services_types_fk;
       public          sarm    false    198    2092    202            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x����n�0���S,�5�O����lK�P�mz!1Y
� P6����%K|��ܝ��/��z�]6�:�"⻬Z�&a�!;`U���J�
m_�F�ku^�	���ܕ�@E��}dJe4��p�R�`��ػ_��A{`��^�����띲��p�����o�;����5M����-��?m?��/�b��b�|�Y�K� ��%�p��B�7i{      �      x������ � �      b    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16384    sarm    DATABASE     v   CREATE DATABASE sarm WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE sarm;
                postgres    false            �           0    0    DATABASE sarm    ACL     �   REVOKE ALL ON DATABASE sarm FROM PUBLIC;
REVOKE ALL ON DATABASE sarm FROM postgres;
GRANT ALL ON DATABASE sarm TO postgres;
GRANT CONNECT,TEMPORARY ON DATABASE sarm TO PUBLIC;
GRANT ALL ON DATABASE sarm TO sarm;
                   postgres    false    2247                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    6            �           0    0    SCHEMA public    ACL     �   REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    6            �            1259    16551 	   contracts    TABLE       CREATE TABLE public.contracts (
    cont_id integer NOT NULL,
    cont_code character varying,
    cont_name character varying,
    social_name character varying,
    status character varying,
    close_time character varying,
    comments character varying
);
    DROP TABLE public.contracts;
       public            sarm    false    6            �            1259    16549    contracts_cont_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.contracts_cont_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.contracts_cont_id_seq;
       public          sarm    false    202    6            �           0    0    contracts_cont_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.contracts_cont_id_seq OWNED BY public.contracts.cont_id;
          public          sarm    false    201            �            1259    16470    modules    TABLE     �   CREATE TABLE public.modules (
    modu_id integer NOT NULL,
    modu_name character varying,
    modu_url character varying NOT NULL
);
    DROP TABLE public.modules;
       public            sarm    false    6            �            1259    16468    modules_modu_id_seq    SEQUENCE     |   CREATE SEQUENCE public.modules_modu_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.modules_modu_id_seq;
       public          sarm    false    192    6            �           0    0    modules_modu_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.modules_modu_id_seq OWNED BY public.modules.modu_id;
          public          sarm    false    191            �            1259    16451    permissions    TABLE       CREATE TABLE public.permissions (
    perm_id integer NOT NULL,
    perm_name character varying NOT NULL,
    perm_tag character varying NOT NULL,
    perm_description character varying NOT NULL,
    perm_active character varying,
    modu_id character varying
);
    DROP TABLE public.permissions;
       public            sarm    false    6            �            1259    16449    permissions_perm_id_seq    SEQUENCE     �   CREATE SEQUENCE public.permissions_perm_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.permissions_perm_id_seq;
       public          sarm    false    6    190            �           0    0    permissions_perm_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.permissions_perm_id_seq OWNED BY public.permissions.perm_id;
          public          sarm    false    189            �            1259    16438    profiles_permissions    TABLE     �   CREATE TABLE public.profiles_permissions (
    profperm_id integer NOT NULL,
    prof_id integer NOT NULL,
    perm_id integer NOT NULL
);
 (   DROP TABLE public.profiles_permissions;
       public            sarm    false    6            �            1259    16436     prof_permissions_profperm_id_seq    SEQUENCE     �   CREATE SEQUENCE public.prof_permissions_profperm_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.prof_permissions_profperm_id_seq;
       public          sarm    false    6    188            �           0    0     prof_permissions_profperm_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.prof_permissions_profperm_id_seq OWNED BY public.profiles_permissions.profperm_id;
          public          sarm    false    187            �            1259    16423    profiles    TABLE     �   CREATE TABLE public.profiles (
    prof_id integer NOT NULL,
    prof_name integer NOT NULL,
    prof_active character varying
);
    DROP TABLE public.profiles;
       public            sarm    false    6            �            1259    16421    profiles_prof_id_seq    SEQUENCE     }   CREATE SEQUENCE public.profiles_prof_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.profiles_prof_id_seq;
       public          sarm    false    186    6            �           0    0    profiles_prof_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.profiles_prof_id_seq OWNED BY public.profiles.prof_id;
          public          sarm    false    185            �            1259    16398    profiles_users    TABLE     �   CREATE TABLE public.profiles_users (
    prousr_id integer NOT NULL,
    user_id integer NOT NULL,
    prof_id integer NOT NULL
);
 "   DROP TABLE public.profiles_users;
       public            sarm    false    6            �            1259    16396    profiles_users_prousr_id_seq    SEQUENCE     �   CREATE SEQUENCE public.profiles_users_prousr_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.profiles_users_prousr_id_seq;
       public          sarm    false    184    6            �           0    0    profiles_users_prousr_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.profiles_users_prousr_id_seq OWNED BY public.profiles_users.prousr_id;
          public          sarm    false    183            �            1259    16487    repositories    TABLE     �   CREATE TABLE public.repositories (
    repo_id integer NOT NULL,
    name character varying NOT NULL,
    size character varying,
    created_time timestamp(0) without time zone NOT NULL,
    url character varying NOT NULL,
    user_id integer
);
     DROP TABLE public.repositories;
       public            sarm    false    6            �            1259    16485    repositories_repo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.repositories_repo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.repositories_repo_id_seq;
       public          sarm    false    6    194            �           0    0    repositories_repo_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.repositories_repo_id_seq OWNED BY public.repositories.repo_id;
          public          sarm    false    193            �            1259    16503    services    TABLE       CREATE TABLE public.services (
    serv_id integer NOT NULL,
    serv_type_id integer NOT NULL,
    "time" character varying,
    sector character varying,
    quantity character varying,
    status character varying,
    equipment character varying,
    repo_id integer
);
    DROP TABLE public.services;
       public            sarm    false    6            �            1259    16535    services_data    TABLE     "  CREATE TABLE public.services_data (
    serv_data_id integer NOT NULL,
    location character varying,
    "time" character varying,
    maintance_status character varying,
    cause character varying,
    observation character varying,
    status character varying,
    serv_id integer
);
 !   DROP TABLE public.services_data;
       public            sarm    false    6            �            1259    16533    services_datee_serv_data_id_seq    SEQUENCE     �   CREATE SEQUENCE public.services_datee_serv_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.services_datee_serv_data_id_seq;
       public          sarm    false    200    6            �           0    0    services_datee_serv_data_id_seq    SEQUENCE OWNED BY     b   ALTER SEQUENCE public.services_datee_serv_data_id_seq OWNED BY public.services_data.serv_data_id;
          public          sarm    false    199            �            1259    16501    services_serv_id_seq    SEQUENCE     }   CREATE SEQUENCE public.services_serv_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.services_serv_id_seq;
       public          sarm    false    196    6            �           0    0    services_serv_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.services_serv_id_seq OWNED BY public.services.serv_id;
          public          sarm    false    195            �            1259    16519    services_types    TABLE     �   CREATE TABLE public.services_types (
    serv_type_id integer NOT NULL,
    serv_name character varying,
    cont_id integer NOT NULL
);
 "   DROP TABLE public.services_types;
       public            sarm    false    6            �            1259    16517    services_types_serv_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.services_types_serv_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.services_types_serv_type_id_seq;
       public          sarm    false    6    198            �           0    0    services_types_serv_type_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.services_types_serv_type_id_seq OWNED BY public.services_types.serv_type_id;
          public          sarm    false    197            �            1259    16571    session    TABLE     �   CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);
    DROP TABLE public.session;
       public            sarm    false    6            �            1259    16388    users    TABLE     I  CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying NOT NULL,
    user_password character varying NOT NULL,
    user_username character varying NOT NULL,
    time_created timestamp(0) without time zone NOT NULL,
    user_id_created character varying,
    user_active boolean DEFAULT true
);
    DROP TABLE public.users;
       public            sarm    false    6            �            1259    16386    users_user_id_seq    SEQUENCE     z   CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          sarm    false    6    182            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          sarm    false    181                       2604    16554    contracts cont_id    DEFAULT     v   ALTER TABLE ONLY public.contracts ALTER COLUMN cont_id SET DEFAULT nextval('public.contracts_cont_id_seq'::regclass);
 @   ALTER TABLE public.contracts ALTER COLUMN cont_id DROP DEFAULT;
       public          sarm    false    201    202    202                       2604    16473    modules modu_id    DEFAULT     r   ALTER TABLE ONLY public.modules ALTER COLUMN modu_id SET DEFAULT nextval('public.modules_modu_id_seq'::regclass);
 >   ALTER TABLE public.modules ALTER COLUMN modu_id DROP DEFAULT;
       public          sarm    false    191    192    192                       2604    16454    permissions perm_id    DEFAULT     z   ALTER TABLE ONLY public.permissions ALTER COLUMN perm_id SET DEFAULT nextval('public.permissions_perm_id_seq'::regclass);
 B   ALTER TABLE public.permissions ALTER COLUMN perm_id DROP DEFAULT;
       public          sarm    false    190    189    190                       2604    16426    profiles prof_id    DEFAULT     t   ALTER TABLE ONLY public.profiles ALTER COLUMN prof_id SET DEFAULT nextval('public.profiles_prof_id_seq'::regclass);
 ?   ALTER TABLE public.profiles ALTER COLUMN prof_id DROP DEFAULT;
       public          sarm    false    186    185    186                       2604    16441     profiles_permissions profperm_id    DEFAULT     �   ALTER TABLE ONLY public.profiles_permissions ALTER COLUMN profperm_id SET DEFAULT nextval('public.prof_permissions_profperm_id_seq'::regclass);
 O   ALTER TABLE public.profiles_permissions ALTER COLUMN profperm_id DROP DEFAULT;
       public          sarm    false    187    188    188                       2604    16401    profiles_users prousr_id    DEFAULT     �   ALTER TABLE ONLY public.profiles_users ALTER COLUMN prousr_id SET DEFAULT nextval('public.profiles_users_prousr_id_seq'::regclass);
 G   ALTER TABLE public.profiles_users ALTER COLUMN prousr_id DROP DEFAULT;
       public          sarm    false    183    184    184                       2604    16490    repositories repo_id    DEFAULT     |   ALTER TABLE ONLY public.repositories ALTER COLUMN repo_id SET DEFAULT nextval('public.repositories_repo_id_seq'::regclass);
 C   ALTER TABLE public.repositories ALTER COLUMN repo_id DROP DEFAULT;
       public          sarm    false    194    193    194                       2604    16506    services serv_id    DEFAULT     t   ALTER TABLE ONLY public.services ALTER COLUMN serv_id SET DEFAULT nextval('public.services_serv_id_seq'::regclass);
 ?   ALTER TABLE public.services ALTER COLUMN serv_id DROP DEFAULT;
       public          sarm    false    196    195    196                       2604    16538    services_data serv_data_id    DEFAULT     �   ALTER TABLE ONLY public.services_data ALTER COLUMN serv_data_id SET DEFAULT nextval('public.services_datee_serv_data_id_seq'::regclass);
 I   ALTER TABLE public.services_data ALTER COLUMN serv_data_id DROP DEFAULT;
       public          sarm    false    200    199    200                       2604    16522    services_types serv_type_id    DEFAULT     �   ALTER TABLE ONLY public.services_types ALTER COLUMN serv_type_id SET DEFAULT nextval('public.services_types_serv_type_id_seq'::regclass);
 J   ALTER TABLE public.services_types ALTER COLUMN serv_type_id DROP DEFAULT;
       public          sarm    false    197    198    198                       2604    16391    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          sarm    false    181    182    182            �          0    16551 	   contracts 
   TABLE DATA           m   COPY public.contracts (cont_id, cont_code, cont_name, social_name, status, close_time, comments) FROM stdin;
    public          sarm    false    202            �          0    16470    modules 
   TABLE DATA           ?   COPY public.modules (modu_id, modu_name, modu_url) FROM stdin;
    public          sarm    false    192           �          0    16451    permissions 
   TABLE DATA           k   COPY public.permissions (perm_id, perm_name, perm_tag, perm_description, perm_active, modu_id) FROM stdin;
    public          sarm    false    190           �          0    16423    profiles 
   TABLE DATA           C   COPY public.profiles (prof_id, prof_name, prof_active) FROM stdin;
    public          sarm    false    186           �          0    16438    profiles_permissions 
   TABLE DATA           M   COPY public.profiles_permissions (profperm_id, prof_id, perm_id) FROM stdin;
    public          sarm    false    188           �          0    16398    profiles_users 
   TABLE DATA           E   COPY public.profiles_users (prousr_id, user_id, prof_id) FROM stdin;
    public          sarm    false    184           �          0    16487    repositories 
   TABLE DATA           W   COPY public.repositories (repo_id, name, size, created_time, url, user_id) FROM stdin;
    public          sarm    false    194           �          0    16503    services 
   TABLE DATA           o   COPY public.services (serv_id, serv_type_id, "time", sector, quantity, status, equipment, repo_id) FROM stdin;
    public          sarm    false    196           �          0    16535    services_data 
   TABLE DATA           ~   COPY public.services_data (serv_data_id, location, "time", maintance_status, cause, observation, status, serv_id) FROM stdin;
    public          sarm    false    200           �          0    16519    services_types 
   TABLE DATA           J   COPY public.services_types (serv_type_id, serv_name, cont_id) FROM stdin;
    public          sarm    false    198           �          0    16571    session 
   TABLE DATA           4   COPY public.session (sid, sess, expire) FROM stdin;
    public          sarm    false    203           �          0    16388    users 
   TABLE DATA           }   COPY public.users (user_id, user_name, user_password, user_username, time_created, user_id_created, user_active) FROM stdin;
    public          sarm    false    182   �        �           0    0    contracts_cont_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.contracts_cont_id_seq', 1, false);
          public          sarm    false    201            �           0    0    modules_modu_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.modules_modu_id_seq', 1, false);
          public          sarm    false    191            �           0    0    permissions_perm_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.permissions_perm_id_seq', 1, false);
          public          sarm    false    189            �           0    0     prof_permissions_profperm_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.prof_permissions_profperm_id_seq', 1, false);
          public          sarm    false    187            �           0    0    profiles_prof_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.profiles_prof_id_seq', 1, false);
          public          sarm    false    185            �           0    0    profiles_users_prousr_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.profiles_users_prousr_id_seq', 1, false);
          public          sarm    false    183            �           0    0    repositories_repo_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.repositories_repo_id_seq', 1, false);
          public          sarm    false    193            �           0    0    services_datee_serv_data_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.services_datee_serv_data_id_seq', 1, false);
          public          sarm    false    199            �           0    0    services_serv_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.services_serv_id_seq', 1, false);
          public          sarm    false    195            �           0    0    services_types_serv_type_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.services_types_serv_type_id_seq', 1, false);
          public          sarm    false    197            �           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);
          public          sarm    false    181            ,           2606    16559    contracts contracts_pk 
   CONSTRAINT     Y   ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_pk PRIMARY KEY (cont_id);
 @   ALTER TABLE ONLY public.contracts DROP CONSTRAINT contracts_pk;
       public            sarm    false    202            "           2606    16478    modules modules_pk 
   CONSTRAINT     U   ALTER TABLE ONLY public.modules
    ADD CONSTRAINT modules_pk PRIMARY KEY (modu_id);
 <   ALTER TABLE ONLY public.modules DROP CONSTRAINT modules_pk;
       public            sarm    false    192                        2606    16459    permissions permissions_pk 
   CONSTRAINT     ]   ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pk PRIMARY KEY (perm_id);
 D   ALTER TABLE ONLY public.permissions DROP CONSTRAINT permissions_pk;
       public            sarm    false    190                       2606    16443 ,   profiles_permissions profiles_permissions_pk 
   CONSTRAINT     s   ALTER TABLE ONLY public.profiles_permissions
    ADD CONSTRAINT profiles_permissions_pk PRIMARY KEY (profperm_id);
 V   ALTER TABLE ONLY public.profiles_permissions DROP CONSTRAINT profiles_permissions_pk;
       public            sarm    false    188                       2606    16428    profiles profiles_pk 
   CONSTRAINT     W   ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pk PRIMARY KEY (prof_id);
 >   ALTER TABLE ONLY public.profiles DROP CONSTRAINT profiles_pk;
       public            sarm    false    186                       2606    16430     profiles_users profiles_users_pk 
   CONSTRAINT     e   ALTER TABLE ONLY public.profiles_users
    ADD CONSTRAINT profiles_users_pk PRIMARY KEY (prousr_id);
 J   ALTER TABLE ONLY public.profiles_users DROP CONSTRAINT profiles_users_pk;
       public            sarm    false    184            $           2606    16495    repositories repositories_pk 
   CONSTRAINT     _   ALTER TABLE ONLY public.repositories
    ADD CONSTRAINT repositories_pk PRIMARY KEY (repo_id);
 F   ALTER TABLE ONLY public.repositories DROP CONSTRAINT repositories_pk;
       public            sarm    false    194            *           2606    16543    services_data services_datee_pk 
   CONSTRAINT     g   ALTER TABLE ONLY public.services_data
    ADD CONSTRAINT services_datee_pk PRIMARY KEY (serv_data_id);
 I   ALTER TABLE ONLY public.services_data DROP CONSTRAINT services_datee_pk;
       public            sarm    false    200            &           2606    16511    services services_pk 
   CONSTRAINT     W   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pk PRIMARY KEY (serv_id);
 >   ALTER TABLE ONLY public.services DROP CONSTRAINT services_pk;
       public            sarm    false    196            (           2606    16527     services_types services_types_pk 
   CONSTRAINT     h   ALTER TABLE ONLY public.services_types
    ADD CONSTRAINT services_types_pk PRIMARY KEY (serv_type_id);
 J   ALTER TABLE ONLY public.services_types DROP CONSTRAINT services_types_pk;
       public            sarm    false    198            /           2606    16578    session session_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public            sarm    false    203                       2606    16406    users users_pk 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
       public            sarm    false    182            -           1259    16579    IDX_session_expire    INDEX     J   CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);
 (   DROP INDEX public."IDX_session_expire";
       public            sarm    false    203            3           2606    16460 #   profiles_permissions permissions_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.profiles_permissions
    ADD CONSTRAINT permissions_fk FOREIGN KEY (perm_id) REFERENCES public.permissions(perm_id);
 M   ALTER TABLE ONLY public.profiles_permissions DROP CONSTRAINT permissions_fk;
       public          sarm    false    188    2080    190            1           2606    16431    profiles_users profiles_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.profiles_users
    ADD CONSTRAINT profiles_fk FOREIGN KEY (prof_id) REFERENCES public.profiles(prof_id);
 D   ALTER TABLE ONLY public.profiles_users DROP CONSTRAINT profiles_fk;
       public          sarm    false    184    186    2076            2           2606    16444 ,   profiles_permissions profiles_permissions_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.profiles_permissions
    ADD CONSTRAINT profiles_permissions_fk FOREIGN KEY (prof_id) REFERENCES public.profiles(prof_id);
 V   ALTER TABLE ONLY public.profiles_permissions DROP CONSTRAINT profiles_permissions_fk;
       public          sarm    false    186    2076    188            0           2606    16413     profiles_users profiles_users_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.profiles_users
    ADD CONSTRAINT profiles_users_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 J   ALTER TABLE ONLY public.profiles_users DROP CONSTRAINT profiles_users_fk;
       public          sarm    false    182    184    2072            4           2606    16496    repositories repositories_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.repositories
    ADD CONSTRAINT repositories_fk FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 F   ALTER TABLE ONLY public.repositories DROP CONSTRAINT repositories_fk;
       public          sarm    false    2072    194    182            8           2606    16544    services_data services_data_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.services_data
    ADD CONSTRAINT services_data_fk FOREIGN KEY (serv_id) REFERENCES public.services(serv_id);
 H   ALTER TABLE ONLY public.services_data DROP CONSTRAINT services_data_fk;
       public          sarm    false    196    200    2086            5           2606    16512    services services_fk    FK CONSTRAINT        ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_fk FOREIGN KEY (repo_id) REFERENCES public.repositories(repo_id);
 >   ALTER TABLE ONLY public.services DROP CONSTRAINT services_fk;
       public          sarm    false    196    2084    194            6           2606    16528    services services_types_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_types_fk FOREIGN KEY (serv_type_id) REFERENCES public.services_types(serv_type_id);
 D   ALTER TABLE ONLY public.services DROP CONSTRAINT services_types_fk;
       public          sarm    false    198    2088    196            7           2606    16560     services_types services_types_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.services_types
    ADD CONSTRAINT services_types_fk FOREIGN KEY (cont_id) REFERENCES public.contracts(cont_id);
 J   ALTER TABLE ONLY public.services_types DROP CONSTRAINT services_types_fk;
       public          sarm    false    198    2092    202           