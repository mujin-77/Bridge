//自定义组合式函数（hook）

import { useRouter } from 'vue-router'

export function useNavigate() {
  const router = useRouter()

  // 通用跳转
  const go = (path) => {
    router.push(path)
  }

  // 带参数跳转
  const goWithQuery = (path, query) => {
    router.push({ path, query })
  }


  const login = () => {
    const token = localStorage.getItem('token')

    if (!token) {
      alert('请先登录')

      router.push({
        path: '/login',
        query: { redirect: '/Dataset' } // ⭐关键
      })
    } else {
      router.push('/Dataset')
    }
  }
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')

    router.push('/HomePage')
  }

  return {
    go,
    goWithQuery,
    login,
    logout,
  }
}