import { AppRoutes } from './routes/AppRoutes';
import { BlogTheme } from './theme/BlogTheme';

export const BlogApp = () => {

  return (
    <BlogTheme>
        <AppRoutes/>
    </BlogTheme>
  )
}

