/// <reference types="node" />
import { DiffVersionHashResult, DiffVersionHashResultItem, DownloadFn, HashedFolder, HashedFolderAndFileType, HashElementOptions, UpdateInfo, UpdateJson, UpdateStatus } from "./type";
/**
 * 生成hash 256
 *
 * @param {(Buffer | string)} data
 * @returns
 */
export declare function hash256(data: Buffer | string): string;
/**
 * 过滤文件夹 正则匹配
 *
 * @param {(string[] | undefined | ((str: string) => boolean))} globs
 * @param {string} param
 * @returns {boolean}
 */
export declare function reduceGlobPatterns(globs: string[] | undefined | ((str: string) => boolean), param: string): boolean;
/**
 * 根据文件路径生成hash
 *
 * @param {string} dirOrFilePath
 * @param {HashElementOptions} options
 * @returns {HashedFolderAndFileType}
 */
export declare function hashElement(dirOrFilePath: string, options?: HashElementOptions): HashedFolderAndFileType | null;
/**
 * 用Object缓存文件信息，减少循环次数
 *
 * @param {HashedFolder} data
 */
export declare function handleHashedFolderChildrenToObject(data: HashedFolderAndFileType): void;
/**
 *
 *  diff两个版本之间的文件差异，查看新增和修改的文件
 * @param {HashedFolder} oldVersion // 储存本地的文件信息 由hashElement获取并handleHashedFolderChildrenToObject转化过的
 * @param {HashedFolder} newVersion // 线上的文件信息
 * @param {*} [result=[]] 结果diff文件差异
 * @param {string} path 文件路径
 * @returns
 */
export declare function diffVersionHash(oldVersion: HashedFolder, newVersion: HashedFolder, result?: DiffVersionHashResult, path?: string): DiffVersionHashResult;
/**
 * 为新增的文件和文件夹循环添加到result.added数组中
 *
 * @param {HashedFolderAndFileType} item
 * @param {string} path
 * @param {DiffVersionHashResultItem[]} resultAdd
 */
export declare function pushdiffVersionHashResult(item: HashedFolderAndFileType, path: string, resultAdd: DiffVersionHashResultItem[]): void;
/**
 * gzip压缩一个文件到指定路径下
 *
 * @export
 * @param {string} source
 * @param {string} targetPath
 * @return {*}
 */
export declare function gzip(source: string, targetPath: string): Promise<void>;
/**
 * hashElement后将对应的数据gzip压缩
 *
 * @export
 * @param {HashedFolderAndFileType} data
 * @param {string} path
 * @param {string} targetPath
 * @param {boolean} [ignoreFirstDir=false]
 */
export declare function zipHashElement(data: HashedFolderAndFileType, path: string, targetPath: string, ignoreFirstDir?: boolean): Promise<void>;
/**
 * 更新electron
 *
 * @export
 * @param {(updateInfo: UpdateInfo) => {}} statusCallBack // 更新状态回调
 * @param {string} updaterName  更新updater名称
 * @param {string} version  当前版本号
 * @param {string} exePath 当前exe路径 app.getPath('exe')
 * @param {string} tempDirectory  临时目录
 * @param {string} updateConfigName  更新配置文件名称
 * @param {UpdateJson} updateJson  更新配置文件
 * @param {string} baseUrl  更新下载gzip的基本地址 `${url}/${gzipDirectory}${version}`
 * @param {DownloadFn} downloadFn  下载函数
 * @param {HashElementOptions} [options={files: {}}] 通过option 配置文件排除文件文件夹或指定后缀folders: { exclude: ['.*', 'node_modules', 'test_coverage'] },files: { exclude: ['*.js', '*.json'] },
 */
export declare function updateElectron(statusCallBack: (updateInfo: UpdateInfo) => void, updaterName: string, version: string, exePath: string, tempDirectory: string, updateConfigName: string, updateJson: UpdateJson, baseUrl: string, downloadFn: DownloadFn, options?: HashElementOptions): Promise<UpdateStatus>;
