-- Combined migration file that includes all necessary database setup

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
    id uuid PRIMARY KEY NOT NULL,
    avatar_url text,
    user_id text UNIQUE,
    token_identifier text NOT NULL,
    image text,
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone,
    email text,
    name text,
    full_name text
);

-- Projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id text NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    status text DEFAULT 'active',
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    excerpt text,
    content text NOT NULL,
    author_id text NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE,
    category text,
    tags text[],
    published boolean DEFAULT false,
    published_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
DO $$
BEGIN
    -- Check if the policy for SELECT exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'users' 
        AND policyname = 'Users can view own data'
    ) THEN
        -- Create policy to allow users to see only their own data
        EXECUTE 'CREATE POLICY "Users can view own data" ON public.users
                FOR SELECT USING (auth.uid()::text = user_id)';
    END IF;

    -- Check if the policy for INSERT exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'users' 
        AND policyname = 'Users can insert own data'
    ) THEN
        -- Create policy to allow users to insert their own data
        EXECUTE 'CREATE POLICY "Users can insert own data" ON public.users
                FOR INSERT WITH CHECK (auth.uid()::text = user_id)';
    END IF;

    -- Check if the policy for UPDATE exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'users' 
        AND policyname = 'Users can update own data'
    ) THEN
        -- Create policy to allow users to update their own data
        EXECUTE 'CREATE POLICY "Users can update own data" ON public.users
                FOR UPDATE USING (auth.uid()::text = user_id)';
    END IF;

    -- Projects policies - Allow all to view public projects
    -- SELECT policy for projects (allow all users to view)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'projects' 
        AND policyname = 'Anyone can view projects'
    ) THEN
        EXECUTE 'CREATE POLICY "Anyone can view projects" ON public.projects
                FOR SELECT USING (true)';
    END IF;

    -- INSERT policy for projects
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'projects' 
        AND policyname = 'Users can create projects'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can create projects" ON public.projects
                FOR INSERT WITH CHECK (auth.uid()::text = user_id)';
    END IF;

    -- UPDATE policy for projects
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'projects' 
        AND policyname = 'Users can update own projects'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can update own projects" ON public.projects
                FOR UPDATE USING (auth.uid()::text = user_id)';
    END IF;

    -- DELETE policy for projects
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'projects' 
        AND policyname = 'Users can delete own projects'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can delete own projects" ON public.projects
                FOR DELETE USING (auth.uid()::text = user_id)';
    END IF;

    -- Blogs policies - Allow all to view published blogs, admins can manage all
    -- SELECT policy for blogs (allow all users to view published blogs)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'blogs' 
        AND policyname = 'Anyone can view published blogs'
    ) THEN
        EXECUTE 'CREATE POLICY "Anyone can view published blogs" ON public.blogs
                FOR SELECT USING (published = true)';
    END IF;

    -- INSERT policy for blogs (only authenticated users can create)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'blogs' 
        AND policyname = 'Authenticated users can create blogs'
    ) THEN
        EXECUTE 'CREATE POLICY "Authenticated users can create blogs" ON public.blogs
                FOR INSERT WITH CHECK (auth.uid()::text = author_id)';
    END IF;

    -- UPDATE policy for blogs (authors can update their own blogs)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'blogs' 
        AND policyname = 'Authors can update own blogs'
    ) THEN
        EXECUTE 'CREATE POLICY "Authors can update own blogs" ON public.blogs
                FOR UPDATE USING (auth.uid()::text = author_id)';
    END IF;

    -- DELETE policy for blogs (authors can delete their own blogs)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'blogs' 
        AND policyname = 'Authors can delete own blogs'
    ) THEN
        EXECUTE 'CREATE POLICY "Authors can delete own blogs" ON public.blogs
                FOR DELETE USING (auth.uid()::text = author_id)';
    END IF;

END
$$;

-- Create a function that will be triggered when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    user_id,
    email,
    name,
    full_name,
    avatar_url,
    token_identifier,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.id::text,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.email,
    NEW.created_at,
    NEW.updated_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new user is added to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update the function to handle user updates as well
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users
  SET
    email = NEW.email,
    name = NEW.raw_user_meta_data->>'name',
    full_name = NEW.raw_user_meta_data->>'full_name',
    avatar_url = NEW.raw_user_meta_data->>'avatar_url',
    updated_at = NEW.updated_at
  WHERE user_id = NEW.id::text;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a user is updated in auth.users
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_update(); 