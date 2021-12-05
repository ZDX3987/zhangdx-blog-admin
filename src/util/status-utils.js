export let StatusUtils = [
    {code: 0, text: '已保存'},
    {code: 1, text: '待审核'},
    {code: 2, text: '已发布'},
    {code: 3, text: '已删除'},
];

let CommonStatus = [
    {code: -1, name: '待审核', type: 'warning'},
    {code: 0, name: '无效', type: ''},
    {code: 1, name: '有效', type: 'success'}
]

export function showCommonStatus(code) {
    if (isNaN(code) || code < -1 || code > 1) {
        code = -1;
    }
    return CommonStatus[code + 1];
}