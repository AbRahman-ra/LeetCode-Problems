from typing import List

class Solution:
    @staticmethod
    def find_first_occurance(nums: list, target: int)->int:
        """
        Find the index of the first occurance of target in a list using binary search
        """
        start = 0
        end = len(nums) - 1
        middle = int(((start + end) - ((start + end) % 2)) / 2)

        while start < end:
            # if m > target => move end and ignore m
            if nums[middle] > target:
                end = middle - 1
            # else if m < target => move start and ignore m
            elif nums[middle] < target:
                start = middle + 1
            # else => move end but DO NOT ignore m
            else:
                end = middle

            # recalculate m
            middle = int(((start + end) - ((start + end) % 2)) / 2)


        return middle if nums[middle] == target else -1



    @staticmethod
    def find_last_occurance(nums: list, target: int)->int:
        """
        Find the index of the first occurance of target in a list using binary search
        """
        start = 0
        end = len(nums) - 1
        middle = int(((start + end) + ((start + end) % 2)) / 2)

        while start < end:
            # if m > target => move end and ignore m
            if nums[middle] > target:
                end = middle - 1
            # else if m < target => move start and ignore m
            elif nums[middle] < target:
                start = middle + 1
            # else => move start but DO NOT ignore m
            else:
                start = middle

            # recalculate m
            middle = int(((start + end) + ((start + end) % 2)) / 2)


        return middle if nums[middle] == target else -1


    def searchRange(self, nums: List[int], target: int) -> List[int]:
        if len(nums) == 0 or nums[0] > target or nums[len(nums) - 1] < target:
            return [-1, -1]
        return [self.find_first_occurance(nums, target), self.find_last_occurance(nums, target)]
        