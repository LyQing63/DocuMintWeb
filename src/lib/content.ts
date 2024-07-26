export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Docmint" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "如何构建属于用户的个性化AI，将AI更好的服务于文字工作者？",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "显然，简单的让用户直接上传数据具有较多问题：",
        },
      ],
    },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "不同设备的存储、计算、通信性能的差异" },
                { type: "text", marks: [{ type: "bold" }], text: "（系统异构）" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "数据分布的不一致性" },
                { type: "text", marks: [{ type: "bold" }], text: "（统计异构）" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "隐私问题，如何让用户在确保隐私的基础上得到更加优质的AI辅助体验",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "由于数据的统计异构问题，用户间的隐私数据具有分散、Non-IID(非独立同分布)特性，每个用户本地的数据分布会随着用户所在地以及用户偏好而变动。反映在模型性能上的情况就是：",
        },
        { type: "text", marks: [{ type: "bold" }], text: "Local models 的性能远高于Global model的精度。" },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "原因很简单，模型的暴力聚合(FedAvg)并不是线性的求和，每个用户自身的模型参数仅适合本身的数据，而不同用户数据间的数据分布以及质量差距较大。",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Personalization 技术的提出：由于用户数据的高度 Non-IID 以及用户对模型性能要求的不一致，单个的 Global model 很难满足所有参与者的需求，因此需要采用一种个性化的方法使得 Global model 针对每个用户进行优化。",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "本项目中，我们设想采用基于FedRep的算法机制，用户的个人数据将参与小数据样本聚合，得到client-special heads，再参与全局模型训练。随着训练迭代和用户参与提高，我们将得到不断升级的全局模型，以及具有用户自身特色的客户端模型。",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "简单来说，可以",
        },
        { type: "text", marks: [{ type: "bold" }], text: "实现一个越来越专业的社区模型，以及让用户AI体验越来越贴合自己的写作习惯" },
        { type: "text", text: "。", },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "我们采用如下算法进行联邦处理：",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "采用我们团队成员的文章提出的如下算法进行小数据样本聚合，该算法在文本数据处理场景下具有良好性能：",
        },
      ],
    },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "用户通过充值购买服务，调用百度飞桨API实现云端训练模型，以用户文本为数据集参与联邦学习中。" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "用户在本地应用中直接使用本地算力进行，将对费用进行补贴。" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

