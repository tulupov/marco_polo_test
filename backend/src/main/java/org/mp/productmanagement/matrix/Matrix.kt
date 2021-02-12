package org.mp.productmanagement.matrix

import java.lang.Math.random

class Matrix(private val size: Int) {

    val array: Array<Array<Int>>

    init {
        if (size <= 0) {
            throw IllegalArgumentException("Matrix size can be only positive number")
        }
        array = Array(size) {Array(0) {0}}
    }

    fun drawDiagonals(): Matrix {
        val copy = array
        for (i in 0 until size) {
            copy[i][i] = (random() * Int.MAX_VALUE).toInt()
        }
        for (i in 0 until size) {
            copy[i][size - i - 1] = (random() * Int.MAX_VALUE).toInt()
        }
        return this
    }

    fun getCenter(): Int {
        if (size.rem(2) == 0) {
            throw IllegalArgumentException("Center determined only for odd matrix size")
        }
        val center = size / 2
        return array[center][center]
    }
}