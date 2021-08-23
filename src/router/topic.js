import TopicList from "../views/topic/TopicList";
import EditTopic from "../views/topic/EditTopic";

export default [
  {
    path: 'topic',
    name: 'TopicIndex',
    component: () => import('../views/topic/TopicIndex'),
    redirect: {name: 'TopicList'},
    meta: {
      title: '专题管理'
    },
    children: [
      {
        path: 'list',
        name: 'TopicList',
        component: () => import('../views/topic/TopicList'),
        meta: {
          title: '专题列表'
        }
      },
      {
        path: 'edit',
        name: 'EditTopic',
        component: () => import('../views/topic/EditTopic'),
        meta: {
          title: '编辑专题'
        },
      }
    ]
  }
]
