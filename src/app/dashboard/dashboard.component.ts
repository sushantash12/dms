import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  data: any;
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );
  transformer = (node: FileNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      type: node.type,
      level: level
    };
  };
  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  fileData: any;
  selectedNode: any;
  currentNode: any;

  constructor(private apiService: ApiService, private sharedService: SharedService ) {}

  ngOnInit() {
    this.getListOfFiles();
  }

  async getListOfFiles(): Promise<any> {
    const data = sessionStorage.getItem('username');
    const response = await this.apiService.getListOfFiles(data);
    this.fileData = response.files;
    this.data = this.convertTreeData(this.fileData);
    console.log(this.fileData);
    this.dataSource.data = this.data;
  }

  convertTreeData(data: any) {
    let tree: FileNode[] = [];

    const addToTree = (path: any, type: any, size: any) => {
      const parts = path.split('/');
      let currentNode: any = tree;

      for (const part of parts) {
        if (part.trim() === '') continue;

        let existingNode = currentNode.find((node: any) => node.name === part);
        if (!existingNode) {
          existingNode = part.includes('.') ? { name: part, type: 'file', key: path, size: size } : { name: part, type: 'folder', children: [], key: path, size: size };
          currentNode.push(existingNode);
        }
        currentNode = part.includes('.') ? currentNode : existingNode.children;
      }
    };

    data.forEach((item: any) => {
      const { Key, Size } = item;
      const type = Key.includes('.') ? 'file' : 'folder';

      addToTree(Key, type, Size);
    });

    return tree;
  }

  hasChild = (_: number, node: FileNode) => !!node.children && node.children.length > 0;


  selectNode(node: any) {
    let key = node.name;
    if (node.type === 'folder') {
      key += '/';
    }
    console.log(key);
    key = this.fileData.find((item: any) => {
      if (item.Key.endsWith(key)) {
        this.currentNode = item;
        this.selectedNode = node;
      }
    });
    this.sharedService.fileData.next(this.currentNode);
    console.log(this.currentNode);
    console.log(this.selectedNode);
  }
}

export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];  
  key: string;
  size: number;
}

export interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  type: string;
}