import TopicList from "../components/topic/TopicList";
import EditTopic from "../components/topic/EditTopic";
import TopicIndex from "../components/topic/TopicIndex";

export default [
  {
    path: 'topic',
    name: 'TopicIndex',
    component: TopicIndex,
    redirect: {name: 'TopicList'},
    meta: {
      title: '专题管理'
    },
    children: [
      {
        path: 'list',
        name: 'TopicList',
        component: TopicList,
        meta: {
          title: '专题列表'
        }
      },
      {
        path: 'edit',
        name: 'EditTopic',
        component: EditTopic,
        meta: {
          title: '编辑专题'
        },
      }
    ]
  }
]
