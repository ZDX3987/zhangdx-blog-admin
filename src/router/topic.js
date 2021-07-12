import TopicList from "../components/topic/TopicList";
import EditTopic from "../components/topic/EditTopic";

export default [
  {
    path: 'topic',
    name: 'TopicIndex',
    component: () => import('../components/topic/TopicIndex'),
    redirect: {name: 'TopicList'},
    meta: {
      title: '专题管理'
    },
    children: [
      {
        path: 'list',
        name: 'TopicList',
        component: () => import('../components/topic/TopicList'),
        meta: {
          title: '专题列表'
        }
      },
      {
        path: 'edit',
        name: 'EditTopic',
        component: () => import('../components/topic/EditTopic'),
        meta: {
          title: '编辑专题'
        },
      }
    ]
  }
]
