// 自定义组合式函数（hook）

import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

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

  // 登录校验跳转
  const login = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      try {
        await ElMessageBox.confirm(
          '请先登录后再访问数据集页面',
          '提示',
          {
            confirmButtonText: '去登录',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }
        )

        // 点击“去登录”
        router.push({
          path: '/login',
          query: { redirect: '/Dataset' }
        })
      } catch (error) {
        // 点击取消，不处理
        console.error(error)
      }
    } else {
      router.push('/Dataset')
    }
  }

  // 退出登录
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')

    router.push('/HomePage')
  }

  return {
    go,
    goWithQuery,
    login,
    logout
  }
}