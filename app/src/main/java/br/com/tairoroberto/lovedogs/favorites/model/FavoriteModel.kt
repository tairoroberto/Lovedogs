package br.com.tairoroberto.lovedogs.petshop.model

import android.util.Log
import br.com.tairoroberto.lovedogs.base.ApiUtils
import br.com.tairoroberto.lovedogs.petshop.contract.FavoriteContract
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

/**
 * Created by tairo on 8/15/17.
 */
class FavoriteModel(private val presenter: FavoriteContract.Presenter) : FavoriteContract.Model {

    override fun listarPetshops() {
        ApiUtils.getApiService()?.getPetshops()?.subscribeOn(Schedulers.io())
                ?.observeOn(AndroidSchedulers.mainThread())
                ?.subscribe({
                    presenter.manipulatePetshopsResponse(it)
                }, { error ->
                    Log.i("LOG", "${error.message}")
                    presenter.showError(error.message as String)
                })
    }

    fun getPetshop() {

    }
}