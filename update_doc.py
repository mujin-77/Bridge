#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
更新 Word 文档内容，根据项目实际情况修改技术栈描述
"""

import re
import sys

def update_document_xml(input_file, output_file):
    """
    更新 document.xml 文件内容
    """
    # 读取文件
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. 更新数据层描述：从 Mock JSON 改为 SQLite 数据库
    content = content.replace(
        '数据层采用Mock JSON本地模拟业务数据，为项目提供数据支持',
        '数据层采用SQLite数据库存储桥梁数据，通过Express后端服务提供RESTful API接口，实现数据的增删改查与持久化存储'
    )
    
    # 2. 添加 Three.js 3D 可视化描述
    # 在 ECharts 描述后添加 Three.js
    content = content.replace(
        'ECharts这款开源数据可视化图表库，完成各类图表、地图的可视化渲染',
        'ECharts这款开源数据可视化图表库，完成各类图表、地图的可视化渲染；引入Three.js实现桥梁3D模型展示与交互'
    )
    
    # 3. 添加 Electron 桌面应用描述
    # 在作品简介部分添加桌面应用说明
    if '三大核心功能模块' in content:
        content = content.replace(
            '整体划分为三大核心功能模块',
            '支持Web端和Electron桌面端双平台运行，整体划分为三大核心功能模块'
        )
    
    # 4. 更新技术栈部分，添加完整的技术列表
    # 在前端技术栈部分添加 Three.js 和 XLSX
    if 'Vite这款新一代前端工程化构建工具' in content:
        content = content.replace(
            'Vite这款新一代前端工程化构建工具，有效提升开发与打包效率；利用',
            'Vite这款新一代前端工程化构建工具，有效提升开发与打包效率；引入Three.js实现3D可视化展示；利用'
        )
    
    # 5. 添加后端技术栈描述
    # 在技术亮点或作品技术部分添加后端说明
    if '项目技术亮点' in content:
        # 在技术亮点前添加后端技术说明
        content = content.replace(
            '项目技术亮点',
            '后端服务采用Express框架搭建RESTful API，使用SQLite数据库进行数据持久化存储，支持前后端分离部署。\n\n3.4 桌面端应用\n\n项目支持Electron桌面端打包，可将Web应用封装为Windows可执行程序，无需浏览器即可运行，支持离线使用。\n\n项目技术亮点'
        )
    
    # 6. 更新项目功能描述，添加后端和桌面端说明
    content = content.replace(
        '采用B/S架构、前后端分离模式开发Web端网页',
        '采用B/S架构、前后端分离模式开发，支持Web端网页访问与Electron桌面端应用'
    )
    
    # 7. 添加数据库相关描述
    if '数据集管理模块' in content:
        content = content.replace(
            '数据集管理模块则承担桥梁基础数据的增删改查、筛选及批量导出管理工作',
            '数据集管理模块则承担桥梁基础数据的增删改查、筛选及批量导出管理工作；后端采用SQLite数据库，确保数据持久化存储'
        )
    
    # 写入文件
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"文档已更新并保存到: {output_file}")
    return True

if __name__ == '__main__':
    input_file = r'd:\前端\my-project\unpacked_doc\word\document.xml'
    output_file = r'd:\前端\my-project\unpacked_doc\word\document_updated.xml'
    
    try:
        success = update_document_xml(input_file, output_file)
        if success:
            print("文档更新成功！")
        else:
            print("文档更新失败！")
            sys.exit(1)
    except Exception as e:
        print(f"更新过程中出现错误: {e}")
        sys.exit(1)
